"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, Search } from "lucide-react";

// Define an interface for the car type
interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  image_url: string;
  mileage?: number;
  color?: string;
  transmission?: string;
  fuel_type?: string;
  condition?: string;
  owner_count?: number;
}

export default function CarsList() {
  // State management
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch cars on component mount
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("/api/save-cars");

        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }

        const data = await response.json();
        setCars(data);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Memoized filtered cars based on search term
  const filteredCars = useMemo(() => {
    if (!searchTerm) return cars;

    const searchTermLower = searchTerm.toLowerCase().trim();

    return cars.filter((car) =>
      Object.values(car).some(
        (value) =>
          value !== null &&
          value !== undefined &&
          value.toString().toLowerCase().includes(searchTermLower)
      )
    );
  }, [cars, searchTerm]);

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading cars...</span>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Car Inventory</CardTitle>
          <CardDescription>
            {filteredCars.length} cars in the inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search Input */}
          <div className="mb-4 flex items-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search cars (make, model, year, price, etc.)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Make</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>{car.make}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.year}</TableCell>
                  <TableCell>${car.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCar(car)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      {selectedCar && (
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>
                              {selectedCar.year} {selectedCar.make}{" "}
                              {selectedCar.model}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <img
                                src={selectedCar.image_url}
                                alt={`${selectedCar.make} ${selectedCar.model}`}
                                className="w-full h-auto object-cover rounded-lg"
                              />
                            </div>
                            <div>
                              <p>
                                <strong>Price:</strong> $
                                {selectedCar.price.toLocaleString()}
                              </p>
                              <p>
                                <strong>Mileage:</strong>{" "}
                                {selectedCar.mileage?.toLocaleString() || "N/A"}{" "}
                                miles
                              </p>
                              <p>
                                <strong>Color:</strong>{" "}
                                {selectedCar.color || "N/A"}
                              </p>
                              <p>
                                <strong>Transmission:</strong>{" "}
                                {selectedCar.transmission || "N/A"}
                              </p>
                              <p>
                                <strong>Fuel Type:</strong>{" "}
                                {selectedCar.fuel_type || "N/A"}
                              </p>
                              <p>
                                <strong>Condition:</strong>{" "}
                                {selectedCar.condition || "N/A"}
                              </p>
                              <p>
                                <strong>Owners:</strong>{" "}
                                {selectedCar.owner_count || "N/A"}
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      )}
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Show message if no cars match search */}
          {filteredCars.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No cars found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
