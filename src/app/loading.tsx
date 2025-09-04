export default function Loading() {
  // A simple full-screen loading spinner
  return (
    <div className="flex h-[calc(100vh-6rem)] items-center justify-center">
      <img src={"/alltier_logo_black.webp"} className="h-32 w-32 animate-spin"></img>
    </div>
  );
}