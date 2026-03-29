<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ActivityResource extends JsonResource
{
     /**
      * Transform the resource into an array matching the React ItemCard contract.
      *
      * Frontend expects: id, title, images[], rating, price,
      *                   duration, location, guide (bool → "Yes"/"No")
      */
     public function toArray(Request $request): array
     {
          // Build images array - filter out empty/null URLs
          $images = $this->whenLoaded('images', function () {
               $imageUrls = $this->images->pluck('url')
                    ->filter()
                    ->map(function ($url) {
                         // Convert relative URLs to absolute
                         if (str_starts_with($url, '/storage/')) {
                              return url($url);
                         }
                         return $url;
                    })
                    ->values();
               return $imageUrls->isEmpty() ? null : $imageUrls->toArray();
          }, null);

          // Average rating from reviews if available, otherwise fall back to `rate`
          $rating = $this->relationLoaded('reviews') && $this->reviews->count() > 0
               ? round($this->reviews->avg('rating'), 1)
               : (float) ($this->rate ?? 0);

          $bookingLink = $this->normalizeUrl($this->booking_link ?? null);

          return [
               'id' => $this->id,
               'title' => $this->name_en ?? $this->name_ar ?? 'Unknown Title',
               'images' => $images,
               'rating' => $rating,
               'price' => $this->price ? (float) $this->price : 0,

               'booking_link' => $bookingLink,

               // Activity-specific fields
               'duration' => $this->duration ?? 'N/A',
               'location' => $this->location ?? 'Unknown Location',
               'guide' => $this->live_guide ? 'Yes' : 'No',
               'type' => $this->type ?? null,
          ];
     }

     private function normalizeUrl(?string $url): ?string
     {
          $url = is_string($url) ? trim($url) : null;
          if (empty($url)) {
               return null;
          }

          if (str_starts_with($url, 'http://') || str_starts_with($url, 'https://')) {
               return $url;
          }

          return 'https://' . ltrim($url, '/');
     }

     /**
      * Resolve a relative image path to a fully qualified absolute URL.
      * Returns null if path is empty/null.
      */
     private function resolveImageUrl(?string $path): ?string
     {
          if (empty($path)) {
               return null;
          }

          // Already an absolute URL
          if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
               return $path;
          }

          // Check if it's a storage path (starts with 'storage/' or '/storage/')
          $cleanPath = ltrim($path, '/');
          if (str_starts_with($cleanPath, 'storage/')) {
               return url($cleanPath);
          }

          // For paths in storage disk (without 'storage/' prefix)
          // Try Storage::url() first for proper disk-based resolution
          if (Storage::disk('public')->exists($cleanPath)) {
               return Storage::url($cleanPath);
          }

          // Fallback: treat as public path and use asset()
          $path = str_starts_with($path, '/') ? $path : '/' . $path;
          return asset($path);
     }
}
