// "use client";
// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { AlertCircle } from "lucide-react";

// export default function AddCarForm() {
//   // State for form fields and errors
//   const [formData, setFormData] = useState({
//     make: "",
//     model: "",
//     year: "",
//     price: "",
//     mileage: "",
//     color: "",
//     transmission: "",
//     fuelType: "",
//     condition: "",
//     ownerCount: "1",
//     imagePreview: null as string | null,
//   });

//   // Error state
//   const [error, setError] = useState<string | null>(null);
//   const [submitStatus, setSubmitStatus] = useState<
//     "idle" | "submitting" | "success"
//   >("idle");

//   // Handle input changes
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//     // Clear any previous errors when user starts typing
//     setError(null);
//   };

//   // Handle select changes
//   const handleSelectChange = (field: string, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//     setError(null);
//   };

//   // Handle image upload
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData((prev) => ({
//           ...prev,
//           imagePreview: reader.result as string,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Submit form handler
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setSubmitStatus("submitting");

//     // Basic validation
//     const requiredFields = ["make", "model", "year", "price", "imagePreview"];
//     const missingFields = requiredFields.filter((field) => !formData[field]);

//     if (missingFields.length > 0) {
//       setError(`Please fill in: ${missingFields.join(", ")}`);
//       setSubmitStatus("idle");
//       return;
//     }

//     try {
//       const response = await fetch("/api/save-cars/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...formData,
//           year: parseInt(formData.year),
//           price: parseFloat(formData.price),
//           mileage: formData.mileage ? parseInt(formData.mileage) : undefined,
//           base64Image: formData.imagePreview,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSubmitStatus("success");
//         // Reset form
//         setFormData({
//           make: "",
//           model: "",
//           year: "",
//           price: "",
//           mileage: "",
//           color: "",
//           transmission: "",
//           fuelType: "",
//           condition: "",
//           ownerCount: "1",
//           imagePreview: null,
//         });
//       } else {
//         setError(data.error || "Failed to add car");
//         setSubmitStatus("idle");
//       }
//     } catch (error) {
//       setError("Network error. Please try again.");
//       setSubmitStatus("idle");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <Card>
//         <CardHeader>
//           <CardTitle>Add New Car</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {error && (
//             <Alert variant="destructive" className="mb-4">
//               <AlertCircle className="h-4 w-4" />
//               <AlertTitle>Error</AlertTitle>
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           {submitStatus === "success" && (
//             <Alert variant="default" className="mb-4 bg-green-50">
//               <AlertCircle className="h-4 w-4 text-green-600" />
//               <AlertTitle className="text-green-600">Success</AlertTitle>
//               <AlertDescription className="text-green-600">
//                 Car added successfully!
//               </AlertDescription>
//             </Alert>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="make">Make</Label>
//               <Input
//                 id="make"
//                 value={formData.make}
//                 onChange={handleInputChange}
//                 placeholder="Enter car make"
//               />
//             </div>

//             <div>
//               <Label htmlFor="model">Model</Label>
//               <Input
//                 id="model"
//                 value={formData.model}
//                 onChange={handleInputChange}
//                 placeholder="Enter car model"
//               />
//             </div>

//             <div>
//               <Label htmlFor="year">Year</Label>
//               <Input
//                 id="year"
//                 type="number"
//                 value={formData.year}
//                 onChange={handleInputChange}
//                 placeholder="Enter year"
//               />
//             </div>

//             <div>
//               <Label htmlFor="price">Price</Label>
//               <Input
//                 id="price"
//                 type="number"
//                 step="0.01"
//                 value={formData.price}
//                 onChange={handleInputChange}
//                 placeholder="Enter price"
//               />
//             </div>

//             <div>
//               <Label htmlFor="mileage">Mileage</Label>
//               <Input
//                 id="mileage"
//                 type="number"
//                 value={formData.mileage}
//                 onChange={handleInputChange}
//                 placeholder="Enter mileage"
//               />
//             </div>

//             <div>
//               <Label htmlFor="color">Color</Label>
//               <Input
//                 id="color"
//                 value={formData.color}
//                 onChange={handleInputChange}
//                 placeholder="Enter color"
//               />
//             </div>

//             <div>
//               <Label htmlFor="transmission">Transmission</Label>
//               <Select
//                 value={formData.transmission}
//                 onValueChange={(value) =>
//                   handleSelectChange("transmission", value)
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select transmission" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="automatic">Automatic</SelectItem>
//                   <SelectItem value="manual">Manual</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <Label htmlFor="fuelType">Fuel Type</Label>
//               <Select
//                 value={formData.fuelType}
//                 onValueChange={(value) => handleSelectChange("fuelType", value)}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select fuel type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="gasoline">Gasoline</SelectItem>
//                   <SelectItem value="diesel">Diesel</SelectItem>
//                   <SelectItem value="electric">Electric</SelectItem>
//                   <SelectItem value="hybrid">Hybrid</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <Label htmlFor="condition">Condition</Label>
//               <Select
//                 value={formData.condition}
//                 onValueChange={(value) =>
//                   handleSelectChange("condition", value)
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select condition" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="new">New</SelectItem>
//                   <SelectItem value="used">Used</SelectItem>
//                   <SelectItem value="certified">Certified Pre-Owned</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <Label htmlFor="ownerCount">Number of Owners</Label>
//               <Input
//                 id="ownerCount"
//                 type="number"
//                 value={formData.ownerCount}
//                 onChange={handleInputChange}
//                 placeholder="Enter number of owners"
//               />
//             </div>

//             <div>
//               <Label htmlFor="imageUpload">Car Image</Label>
//               <Input
//                 id="imageUpload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//               />
//               {formData.imagePreview && (
//                 <img
//                   src={formData.imagePreview}
//                   alt="Car Preview"
//                   className="mt-2 max-w-full h-auto"
//                 />
//               )}
//             </div>

//             <Button
//               type="submit"
//               className="w-full"
//               disabled={submitStatus === "submitting"}
//             >
//               {submitStatus === "submitting" ? "Adding Car..." : "Add Car"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Define the form data interface
interface CarFormData {
  make: string;
  model: string;
  year: string;
  price: string;
  mileage: string;
  color: string;
  transmission: string;
  fuelType: string;
  condition: string;
  ownerCount: string;
  imagePreview: string | null;
}

// Define the keys that are required
type RequiredFields = "make" | "model" | "year" | "price" | "imagePreview";

export default function AddCarForm() {
  // Initial form state with typed interface
  const [formData, setFormData] = useState<CarFormData>({
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    color: "",
    transmission: "",
    fuelType: "",
    condition: "",
    ownerCount: "1",
    imagePreview: null,
  });

  const [error, setError] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setError(null);
  };

  const handleSelectChange = (field: keyof CarFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imagePreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitStatus("submitting");

    // Type-safe required fields check
    const requiredFields: RequiredFields[] = [
      "make",
      "model",
      "year",
      "price",
      "imagePreview",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setError(`Please fill in: ${missingFields.join(", ")}`);
      setSubmitStatus("idle");
      return;
    }

    try {
      const response = await fetch("/api/save-cars/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          year: parseInt(formData.year),
          price: parseFloat(formData.price),
          mileage: formData.mileage ? parseInt(formData.mileage) : undefined,
          base64Image: formData.imagePreview,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        // Reset form with proper typing
        setFormData({
          make: "",
          model: "",
          year: "",
          price: "",
          mileage: "",
          color: "",
          transmission: "",
          fuelType: "",
          condition: "",
          ownerCount: "1",
          imagePreview: null,
        });
      } else {
        setError(data.error || "Failed to add car");
        setSubmitStatus("idle");
      }
    } catch (error) {
      setError("Network error. Please try again.");
      setSubmitStatus("idle");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Car</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {submitStatus === "success" && (
            <Alert variant="default" className="mb-4 bg-green-50">
              <AlertCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-600">Success</AlertTitle>
              <AlertDescription className="text-green-600">
                Car added successfully!
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="make">Make</Label>
              <Input
                id="make"
                value={formData.make}
                onChange={handleInputChange}
                placeholder="Enter car make"
              />
            </div>

            <div>
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={handleInputChange}
                placeholder="Enter car model"
              />
            </div>

            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={handleInputChange}
                placeholder="Enter year"
              />
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
              />
            </div>

            <div>
              <Label htmlFor="mileage">Mileage</Label>
              <Input
                id="mileage"
                type="number"
                value={formData.mileage}
                onChange={handleInputChange}
                placeholder="Enter mileage"
              />
            </div>

            <div>
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={handleInputChange}
                placeholder="Enter color"
              />
            </div>

            <div>
              <Label htmlFor="transmission">Transmission</Label>
              <Select
                value={formData.transmission}
                onValueChange={(value) =>
                  handleSelectChange("transmission", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="automatic">Automatic</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="fuelType">Fuel Type</Label>
              <Select
                value={formData.fuelType}
                onValueChange={(value) => handleSelectChange("fuelType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gasoline">Gasoline</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="condition">Condition</Label>
              <Select
                value={formData.condition}
                onValueChange={(value) =>
                  handleSelectChange("condition", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                  <SelectItem value="certified">Certified Pre-Owned</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="ownerCount">Number of Owners</Label>
              <Input
                id="ownerCount"
                type="number"
                value={formData.ownerCount}
                onChange={handleInputChange}
                placeholder="Enter number of owners"
              />
            </div>

            <div>
              <Label htmlFor="imageUpload">Car Image</Label>
              <Input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {formData.imagePreview && (
                <img
                  src={formData.imagePreview}
                  alt="Car Preview"
                  className="mt-2 max-w-full h-auto"
                />
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={submitStatus === "submitting"}
            >
              {submitStatus === "submitting" ? "Adding Car..." : "Add Car"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
