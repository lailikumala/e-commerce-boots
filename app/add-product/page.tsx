import AddForm from "@/components/AddForm";

export default function AddProductPage() {
  return (
    <div className="px-4 md:px-12 bg-[#F8F9FA] pb-8">
      <h2 className="text-center font-semibold pt-8 text-xl md: text-2xl w-full mx-auto">
        Add a new product
      </h2>

      {/* "add form component" */}
      <AddForm/>
    </div>
  )
}