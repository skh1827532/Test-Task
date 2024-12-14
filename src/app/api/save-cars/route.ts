import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseUrl="https://eqndrfsctprhxofcugee.supabase.co"
const supabaseAnonKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51YWJvcXFxY2Z1Ymxlc2x4Y2tkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk4NDQyMTcsImV4cCI6MjA0NTQyMDIxN30.xmq8YX_Dg5xJgf-AhdhW9ejEmbmiNgxqV4j6FRg4YbY"
const supabaseServiceRoleKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbmRyZnNjdHByaHhvZmN1Z2VlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDEyOTc1NCwiZXhwIjoyMDQ5NzA1NzU0fQ.bhEK8HbVU9TSiCuj31QqhPIqBKsQouT5iM4TZvi8rb4"

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const {
      make,
      model,
      year,
      price,
      base64Image,
      mileage,
      color,
      transmission,
      fuelType,
      condition,
      ownerCount,
    } = body;

    // Validate required fields
    if (!make || !model || !year || !price || !base64Image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Remove the base64 prefix if present
    const base64ImageClean = base64Image.replace(
      /^data:image\/\w+;base64,/,
      ""
    );

    // Generate a unique filename
    const fileName = `car-${Date.now()}.jpg`;

    // Upload image to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("carimages")
      .upload(fileName, Buffer.from(base64ImageClean, "base64"), {
        contentType: "image/jpeg",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload image", details: uploadError },
        { status: 500 }
      );
    }

    // Get public URL for the uploaded image
    const { data: urlData } = supabase.storage
      .from("carimages")
      .getPublicUrl(fileName);

    // Save car details to database with image URL
    const { data: carData, error: insertError } = await supabase
      .from("cars")
      .insert({
        make,
        model,
        year,
        price,
        image_url: urlData.publicUrl,
        mileage,
        color,
        transmission,
        fuel_type: fuelType,
        condition,
        owner_count: ownerCount || 1,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to save car details", details: insertError },
        { status: 500 }
      );
    }

    // Return the saved car details
    return NextResponse.json(carData, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Fetch all cars from the database
    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .order("created_at", { ascending: false }); // Assuming you have a created_at column

    if (error) {
      console.error("Error fetching cars:", error);
      return NextResponse.json(
        { error: "Failed to fetch cars", details: error },
        { status: 500 }
      );
    }

    // Return the cars data
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
