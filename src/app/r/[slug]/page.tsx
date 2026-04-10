import { BookingPageContent } from "@/app/r/[slug]/booking-page-content";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="w-full px-4 pb-10 pt-4 sm:px-6 lg:px-10">
      <BookingPageContent slug={slug} />
    </div>
  );
}
