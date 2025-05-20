import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Star, ShoppingCart, Heart, Share2, Edit2, Save, X } from "lucide-react";
import Breadcrumb from "../../components/common/breadcrumbs";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useToast } from "../../components/ui/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  rating: number;
  reviews: number;
  specifications: {
    [key: string]: string;
  };
}

const ProductDetail = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product>({
    id: "1",
    name: "iPhone 14 Pro",
    description: "The latest iPhone with cutting-edge technology and stunning design. Features a powerful A16 Bionic chip, advanced camera system, and all-day battery life.",
    price: 999.99,
    images: [
      "https://picsum.photos/800/600",
      "https://picsum.photos/800/601",
      "https://picsum.photos/800/602",
      "https://picsum.photos/800/603",
    ],
    category: "Electronics",
    stock: 50,
    rating: 4.5,
    reviews: 128,
    specifications: {
      "Display": "6.1-inch Super Retina XDR display",
      "Processor": "A16 Bionic chip",
      "Camera": "48MP Main | Ultra Wide | Telephoto",
      "Battery": "Up to 23 hours video playback",
      "Storage": "128GB, 256GB, 512GB, 1TB",
      "Colors": "Space Black, Silver, Gold, Deep Purple",
    },
  });

  const handleInputChange = (
    field: keyof Product,
    value: string | number | string[] | { [key: string]: string }
  ) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSpecificationChange = (key: string, value: string) => {
    setEditedProduct((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value,
      },
    }));
  };

  const handleImageChange = (index: number, newUrl: string) => {
    const newImages = [...editedProduct.images];
    newImages[index] = newUrl;
    handleInputChange("images", newImages);
  };

  const handleSave = async () => {
    try {
      // TODO: Implement API call to save changes
      // await api.updateProduct(editedProduct);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
    setEditedProduct({
      id: "1",
      name: "iPhone 14 Pro",
      description: "The latest iPhone with cutting-edge technology and stunning design. Features a powerful A16 Bionic chip, advanced camera system, and all-day battery life.",
      price: 999.99,
      images: [
        "https://picsum.photos/800/600",
        "https://picsum.photos/800/601",
        "https://picsum.photos/800/602",
        "https://picsum.photos/800/603",
      ],
      category: "Electronics",
      stock: 50,
      rating: 4.5,
      reviews: 128,
      specifications: {
        "Display": "6.1-inch Super Retina XDR display",
        "Processor": "A16 Bionic chip",
        "Camera": "48MP Main | Ultra Wide | Telephoto",
        "Battery": "Up to 23 hours video playback",
        "Storage": "128GB, 256GB, 512GB, 1TB",
        "Colors": "Space Black, Silver, Gold, Deep Purple",
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <Breadcrumb
          links={[
            { value: "Home", to: "/" },
            { value: "Products", to: "/products" },
            { value: editedProduct.name, to: `/products/${editedProduct.id}` },
          ]}
        />
        <Button
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Product
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src={editedProduct.images[0]}
              alt={editedProduct.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {editedProduct.images.slice(1).map((image, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
              >
                <img
                  src={image}
                  alt={`${editedProduct.name} - View ${index + 2}`}
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <Input
                    type="text"
                    value={image}
                    onChange={(e) => handleImageChange(index + 1, e.target.value)}
                    className="mt-2"
                    placeholder="Image URL"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            {isEditing ? (
              <Input
                value={editedProduct.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="text-3xl font-bold mb-2"
              />
            ) : (
              <h1 className="text-3xl font-bold">{editedProduct.name}</h1>
            )}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(editedProduct.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({editedProduct.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            {isEditing ? (
              <Input
                type="number"
                value={editedProduct.price}
                onChange={(e) => handleInputChange("price", parseFloat(e.target.value))}
                className="w-32"
              />
            ) : (
              <span className="text-3xl font-bold">${editedProduct.price}</span>
            )}
            <Badge variant="secondary" className="text-sm">
              In Stock ({editedProduct.stock} available)
            </Badge>
          </div>

          {isEditing ? (
            <Textarea
              value={editedProduct.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="min-h-[100px]"
            />
          ) : (
            <p className="text-gray-600">{editedProduct.description}</p>
          )}

          <div className="flex gap-4">
            {isEditing ? (
              <Button className="flex-1" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            ) : (
              <>
                <Button className="flex-1">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>

          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="specifications">
              <Card>
                <CardHeader>
                  <CardTitle>Product Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 gap-4">
                    {Object.entries(editedProduct.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-3 gap-4">
                        <dt className="font-medium text-gray-500">{key}</dt>
                        {isEditing ? (
                          <Input
                            value={value}
                            onChange={(e) => handleSpecificationChange(key, e.target.value)}
                            className="col-span-2"
                          />
                        ) : (
                          <dd className="col-span-2">{value}</dd>
                        )}
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    No reviews yet. Be the first to review this product!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
