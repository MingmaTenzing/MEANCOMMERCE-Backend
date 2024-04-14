const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = "https://wfnqymqvwokdepripazf.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

module.exports = createClient(
  supabaseUrl,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbnF5bXF2d29rZGVwcmlwYXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMTM2MDAsImV4cCI6MjAyNzc4OTYwMH0.x_BZ05EQjxgst7x21NA-24m8vIxS7W7095TPJ0N0j54"
);
