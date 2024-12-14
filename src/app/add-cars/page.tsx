import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddCarForm from "@/components/CarForm";

export default function AddCars() {
  return (
    <div className="container mx-auto px-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Car</CardTitle>
        </CardHeader>
        <CardContent>
          <AddCarForm />
        </CardContent>
      </Card>
    </div>
  );
}
