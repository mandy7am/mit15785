import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");
    if (!FIRECRAWL_API_KEY) {
      return new Response(
        JSON.stringify({ success: false, error: "Firecrawl not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Scrape all Sloan (Dept 15) catalog pages
    const catalogPages = [
      "https://student.mit.edu/catalog/m15a.html",
      "https://student.mit.edu/catalog/m15b.html",
      "https://student.mit.edu/catalog/m15c.html",
    ];

    const allCourses: Array<{
      course_code: string;
      title: string;
      credits: number;
      description: string;
      prerequisites: string;
      department: string;
    }> = [];

    for (const pageUrl of catalogPages) {
      console.log("Scraping:", pageUrl);

      const scrapeResponse = await fetch("https://api.firecrawl.dev/v1/scrape", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: pageUrl,
          formats: ["markdown"],
          onlyMainContent: true,
        }),
      });

      const scrapeData = await scrapeResponse.json();
      if (!scrapeResponse.ok) {
        console.error("Firecrawl error for", pageUrl, scrapeData);
        continue;
      }

      const markdown = scrapeData.data?.markdown || scrapeData.markdown || "";

      // Split by course headers: "### 15.XXX Title" or "15.XXX Title" at start of section
      // The MIT catalog markdown uses ### headers for each course
      const sections = markdown.split(/(?=###\s*15\.\d{3}|(?:^|\n)15\.\d{3})/);

      for (const section of sections) {
        // Extract course code and title from the header line
        const headerMatch = section.match(/(?:###\s*)?(15\.\d{3}[A-Z]?)\s+([^\n]+)/);
        if (!headerMatch) continue;

        const code = headerMatch[1];
        // Clean title: remove markdown image refs, links, HTML tags
        let title = headerMatch[2]
          .replace(/!\[.*?\]\(.*?\)/g, "") // remove markdown images
          .replace(/\[([^\]]*)\]\(.*?\)/g, "$1") // keep link text
          .replace(/<[^>]+>/g, "") // remove HTML tags
          .replace(/\s+/g, " ")
          .trim();

        // Skip if already seen or title is too short
        if (allCourses.some((c) => c.course_code === code)) continue;
        if (title.length < 3) continue;

        // Extract units: pattern like "Units: 4-0-5" or "Units: 3-0-9"
        const unitsMatch = section.match(/Units[:\s]*(\d+)-(\d+)-(\d+)/);
        const credits = unitsMatch
          ? parseInt(unitsMatch[1]) + parseInt(unitsMatch[2]) + parseInt(unitsMatch[3])
          : 12;

        // Extract prerequisites
        const prereqMatch = section.match(/Prereq[:\s]*([^\n]+)/);
        const prerequisites = prereqMatch
          ? prereqMatch[1].replace(/!\[.*?\]\(.*?\)/g, "").replace(/\[([^\]]*)\]\(.*?\)/g, "$1").replace(/<[^>]+>/g, "").trim()
          : "";

        // Extract a short description (first substantial paragraph after metadata)
        let description = "";
        const descLines = section.split("\n").filter((l: string) => {
          const clean = l.replace(/!\[.*?\]\(.*?\)/g, "").replace(/<[^>]+>/g, "").trim();
          return (
            clean.length > 50 &&
            !clean.startsWith("Prereq") &&
            !clean.startsWith("Units") &&
            !clean.startsWith("URL:") &&
            !clean.startsWith("Lecture:") &&
            !clean.match(/^_[^_]+_$/) // skip instructor lines
          );
        });
        if (descLines.length > 0) {
          description = descLines[0]
            .replace(/!\[.*?\]\(.*?\)/g, "")
            .replace(/\[([^\]]*)\]\(.*?\)/g, "$1")
            .replace(/<[^>]+>/g, "")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 500);
        }

        allCourses.push({
          course_code: code,
          title,
          credits,
          description,
          prerequisites,
          department: "15",
        });
      }
    }

    console.log(`Parsed ${allCourses.length} total courses`);

    // Upsert into database
    if (allCourses.length > 0) {
      const { error: upsertError } = await supabase
        .from("mit_courses")
        .upsert(
          allCourses.map((c) => ({
            ...c,
            synced_at: new Date().toISOString(),
          })),
          { onConflict: "course_code" }
        );

      if (upsertError) {
        console.error("Upsert error:", upsertError);
        return new Response(
          JSON.stringify({ success: false, error: "Failed to save courses" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        count: allCourses.length,
        message: `${allCourses.length} Courses Synced. Your AI Bundles are now calibrated to the latest MIT schedule.`,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in sync-mit-catalog:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
