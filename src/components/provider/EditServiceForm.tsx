"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { toast } from "react-toastify";
import {
  BriefcaseBusiness,
  FileText,
  MapPin,
  DollarSign,
  Layers,
  Send,
  Loader2,
  Image as ImageIcon,
  X,
} from "lucide-react";

import { serviceCategories } from "@/constants/serviceCategories";
import { getServiceById, updateService } from "@/lib/actions/service.actions";
import { uploadImage, uploadImageFromUrl } from "@/lib/actions/upload.actions";

interface IServiceEditFormData {
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  subcategory: string;
  tags: string[];
  price: string;
  location: string;
  availability: string[];
  duration: string;
  image: string;
}

const initialState: IServiceEditFormData = {
  title: "",
  shortDescription: "",
  description: "",
  category: "",
  subcategory: "",
  tags: [],
  price: "",
  location: "",
  availability: [],
  duration: "",
  image: "",
};

export default function EditServiceForm({ id }: { id: string }) {
  const router = useRouter();

  const [formData, setFormData] = useState<IServiceEditFormData>(initialState);
  const [tagInput, setTagInput] = useState("");
  const [availabilityInput, setAvailabilityInput] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Load Service Data
  useEffect(() => {
    if (!id) return;

    const fetchService = async () => {
      try {
        const result = await getServiceById(id);

        if (result.success && result.data) {
          setFormData({
            title: result.data.title ?? "",
            shortDescription: result.data.shortDescription ?? "",
            description: result.data.description ?? "",
            category: result.data.category ?? "",
            subcategory: result.data.subcategory ?? "",
            tags: result.data.tags ?? [],
            price: String(result.data.price ?? ""),
            location: result.data.location ?? "",
            availability: result.data.availability ?? [],
            duration: result.data.duration ?? "",
            image: result.data.image ?? "",
          });
          setImagePreview(result.data.image ?? "");
        } else {
          setNotFound(true);
          toast.error("Failed to load service");
        }
      } catch (error) {
        console.log(error);
        setNotFound(true);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setFormData({ ...formData, image: "" });
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    if (formData.tags.includes(tagInput.trim())) {
      setTagInput("");
      return;
    }
    setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
    setTagInput("");
  };

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  const addAvailability = () => {
    if (!availabilityInput.trim()) return;
    if (formData.availability.includes(availabilityInput.trim())) {
      setAvailabilityInput("");
      return;
    }
    setFormData({
      ...formData,
      availability: [...formData.availability, availabilityInput.trim()],
    });
    setAvailabilityInput("");
  };

  const removeAvailability = (index: number) => {
    setFormData({
      ...formData,
      availability: formData.availability.filter((_, i) => i !== index),
    });
  };

  const validate = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return false;
    }
    if (!formData.category) {
      toast.error("Category is required");
      return false;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      toast.error("Enter a valid price");
      return false;
    }
    if (!formData.location.trim()) {
      toast.error("Location is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setUpdating(true);

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      } else if (formData.image && formData.image !== imagePreview) {
        imageUrl = await uploadImageFromUrl(formData.image);
      }

      const result = await updateService(id, {
        ...formData,
      price: formData.price,
        image: imageUrl,
      });

      if (result.success) {
        toast.success("Service updated successfully");
        router.push("/dashboard/provider/services");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="animate-spin text-[#2563EB]" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-3 text-center">
        <p className="text-gray-600">Service not found.</p>
        <Button
          onClick={() => router.push("/dashboard/provider/services")}
          className="rounded-xl bg-[#2563EB] font-semibold text-white"
        >
          Back to Services
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"
    >
      <InputField
        label="Service Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        icon={<BriefcaseBusiness size={18} />}
      />

      <InputField
        label="Short Description"
        name="shortDescription"
        value={formData.shortDescription}
        onChange={handleChange}
        icon={<FileText size={18} />}
      />

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#14213D]">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className="w-full rounded-xl border border-gray-200 p-4 text-sm outline-none focus:border-[#2563EB]"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#14213D]">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#2563EB]"
        >
          <option value="">Select Category</option>
          {serviceCategories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <InputField
          label="Subcategory"
          name="subcategory"
          value={formData.subcategory}
          onChange={handleChange}
          icon={<Layers size={18} />}
        />

        <InputField
          label="Service Duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          icon={<FileText size={18} />}
        />

        <InputField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          icon={<DollarSign size={18} />}
        />

        <InputField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          icon={<MapPin size={18} />}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#14213D]">
          Tags
        </label>
        <div className="flex gap-3">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Example: AC, Cooling"
            className="h-12 flex-1 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#2563EB]"
          />
          <button
            type="button"
            onClick={addTag}
            className="rounded-xl bg-[#2563EB] px-5 text-white"
          >
            Add
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm"
            >
              {tag}
              <button type="button" onClick={() => removeTag(index)}>
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#14213D]">
          Availability
        </label>
        <div className="flex gap-3">
          <input
            value={availabilityInput}
            onChange={(e) => setAvailabilityInput(e.target.value)}
            placeholder="Example: Sunday"
            className="h-12 flex-1 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#2563EB]"
          />
          <button
            type="button"
            onClick={addAvailability}
            className="rounded-xl bg-[#2563EB] px-5 text-white"
          >
            Add
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {formData.availability.map((day, index) => (
            <span
              key={index}
              className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm"
            >
              {day}
              <button type="button" onClick={() => removeAvailability(index)}>
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#14213D]">
          Service Image
        </label>

        <div className="space-y-4">
          <div className="relative">
            <ImageIcon size={18} className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-800"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-gray-600">
              Or Paste Image URL
            </p>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={(e) => {
                handleChange(e);
                setImagePreview(e.target.value);
              }}
              placeholder="https://images.unsplash.com/example.jpg"
              className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none focus:border-[#2563EB]"
            />
          </div>

          {imagePreview && (
            <div className="relative overflow-hidden rounded-2xl border border-gray-200">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-48 w-full object-cover object-center"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      <Button
        type="submit"
        isDisabled={updating}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] font-semibold text-white"
      >
        <Send size={18} />
        {updating ? "Updating..." : "Update Service"}
      </Button>
    </form>
  );
}

function InputField({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  icon,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#14213D]">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-3.5 text-gray-400">{icon}</div>
        )}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-[#2563EB]"
        />
      </div>
    </div>
  );
}