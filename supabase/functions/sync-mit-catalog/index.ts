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

    // Scrape MIT Sloan (Department 15) catalog
    const scrapeUrl = "https://student.mit.edu/catalog/m15a.html";

    console.log("Scraping MIT catalog:", scrapeUrl);

    const scrapeResponse = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: scrapeUrl,
        formats: ["markdown"],
        onlyMainContent: true,
      }),
    });

    const scrapeData = await scrapeResponse.json();

    if (!scrapeResponse.ok) {
      console.error("Firecrawl error:", scrapeData);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to scrape MIT catalog" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const markdown = scrapeData.data?.markdown || scrapeData.markdown || "";
    console.log("Scraped markdown length:", markdown.length);

    // Parse courses from the markdown
    // MIT catalog format: course codes like 15.000, 15.001, etc.
    const courses: Array<{
      course_code: string;
      title: string;
      credits: number;
      description: string;
      prerequisites: string;
      department: string;
    }> = [];

    // Pattern: Course ID followed by title, units info
    // MIT format typically: "15.010 Economic Analysis for Business Decisions"
    const coursePattern = /\b(15\.\d{3}[A-Z]?)\s+(.+?)(?:\n|$)/g;
    let match;

    while ((match = coursePattern.exec(markdown)) !== null) {
      const code = match[1];
      const titleLine = match[2].trim();

      // Skip duplicates
      if (courses.some((c) => c.course_code === code)) continue;

      // Try to extract units from nearby text
      const unitsMatch = titleLine.match(/(\d+)-(\d+)-(\d+)/);
      const credits = unitsMatch
        ? parseInt(unitsMatch[1]) + parseInt(unitsMatch[2]) + parseInt(unitsMatch[3])
        : 12;

      // Clean title (remove units pattern if present)
      const title = titleLine.replace(/\s*\d+-\d+-\d+\s*/, "").trim();

      if (title.length > 2) {
        courses.push({
          course_code: code,
          title,
          credits,
          description: "",
          prerequisites: "",
          department: "15",
        });
      }
    }

    // Also try scraping additional pages (m15b, m15c) for more courses
    const additionalPages = ["https://student.mit.edu/catalog/m15b.html", "https://student.mit.edu/catalog/m15c.html"];

    for (const pageUrl of additionalPages) {
      try {
        console.log("Scraping additional page:", pageUrl);
        const pageResponse = await fetch("https://api.firecrawl.dev/v1/scrape", {
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

        const pageData = await pageResponse.json();
        if (pageResponse.ok) {
          const pageMarkdown = pageData.data?.markdown || pageData.markdown || "";
          let pageMatch;
          const pagePattern = /\b(15\.\d{3}[A-Z]?)\s+(.+?)(?:\n|$)/g;

          while ((pageMatch = pagePattern.exec(pageMarkdown)) !== null) {
            const code = pageMatch[1];
            const titleLine = pageMatch[2].trim();
            if (courses.some((c) => c.course_code === code)) continue;

            const unitsMatch = titleLine.match(/(\d+)-(\d+)-(\d+)/);
            const credits = unitsMatch
              ? parseInt(unitsMatch[1]) + parseInt(unitsMatch[2]) + parseInt(unitsMatch[3])
              : 12;
            const title = titleLine.replace(/\s*\d+-\d+-\d+\s*/, "").trim();

            if (title.length > 2) {
              courses.push({
                course_code: code,
                title,
                credits,
                description: "",
                prerequisites: "",
                department: "15",
              });
            }
          }
        }
      } catch (e) {
        console.error("Error scraping additional page:", pageUrl, e);
      }
    }

    console.log(`Parsed ${courses.length} courses from catalog`);

    // Upsert courses into the database
    if (courses.length > 0) {
      const { error: upsertError } = await supabase
        .from("mit_courses")
        .upsert(
          courses.map((c) => ({
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
        count: courses.length,
        message: `${courses.length} Courses Synced. Your AI Bundles are now calibrated to the latest MIT schedule.`,
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
