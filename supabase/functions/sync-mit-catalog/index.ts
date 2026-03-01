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

      // The MIT catalog markdown has sections like:
      // ### 15.010 Economic Analysis for Business Decisions   ![...](...)...
      // We need to split by ### headers and extract just code + title
      const coursePattern = /(?:###\s*)?(15\.\d{3}[A-Z]?)\s+([^!\n\[(<]+)/g;
      let match;

      while ((match = coursePattern.exec(markdown)) !== null) {
        const code = match[1];
        let title = match[2].trim();

        // Clean up trailing whitespace/punctuation
        title = title.replace(/\s+$/, "").replace(/[,;:\s]+$/, "");

        if (allCourses.some((c) => c.course_code === code)) continue;
        if (title.length < 3) continue;

        // Find the section for this course to extract metadata
        const codeEscaped = code.replace(".", "\\.");
        const sectionMatch = markdown.match(new RegExp(codeEscaped + "[\\s\\S]*?(?=###\\s*15\\.|$)"));
        const section = sectionMatch ? sectionMatch[0] : "";

        // Extract units
        const unitsMatch = section.match(/Units[:\s]*(\d+)-(\d+)-(\d+)/);
        const credits = unitsMatch
          ? parseInt(unitsMatch[1]) + parseInt(unitsMatch[2]) + parseInt(unitsMatch[3])
          : 12;

        // Extract prerequisites - just the first part before any junk
        const prereqMatch = section.match(/Prereq[:\s]*([^\\U\n]{2,60})/);
        let prerequisites = prereqMatch ? prereqMatch[1].replace(/!\[.*?\]\(.*?\)/g, "").replace(/\[([^\]]*)\]\(.*?\)/g, "$1").replace(/<[^>]+>/g, "").trim() : "";
        if (prerequisites.length > 100) prerequisites = prerequisites.slice(0, 100);

        // Extract description - look for substantial text block
        const descMatch = section.match(/(?:Units[^\n]*\n|P\/D\/F\][^\n]*\n)([A-Z][^#]{30,500})/);
        let description = descMatch
          ? descMatch[1].replace(/!\[.*?\]\(.*?\)/g, "").replace(/\[([^\]]*)\]\(.*?\)/g, "$1").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 500)
          : "";

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
