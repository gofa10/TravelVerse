<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class ImageProxyController extends Controller
{
    private const CACHE_TTL_SECONDS = 86400; // 24h

    public function fetch(Request $request)
    {
        $url = trim((string) $request->query('url', ''));
        if ($url === '' || !$this->isAllowedCloudFrontUrl($url)) {
            return $this->error('Invalid or disallowed image URL', 422);
        }

        $cacheKey = 'image_proxy:' . sha1($url);
        $cached = Cache::get($cacheKey);

        if (is_array($cached) && isset($cached['body_base64'], $cached['content_type'])) {
            $decoded = base64_decode($cached['body_base64'], true);
            if ($decoded !== false) {
                return response($decoded, 200, [
                    'Content-Type' => $cached['content_type'],
                    'Cache-Control' => 'public, max-age=86400',
                ]);
            }
        }

        $remote = Http::timeout(15)
            ->withHeaders(['Accept' => 'image/*'])
            ->get($url);

        if (!$remote->successful()) {
            return $this->error('Unable to fetch remote image', 502);
        }

        $contentType = (string) $remote->header('Content-Type', 'application/octet-stream');
        if (!str_starts_with(strtolower($contentType), 'image/')) {
            return $this->error('Remote content is not an image', 415);
        }

        $body = $remote->body();
        Cache::put($cacheKey, [
            'body_base64' => base64_encode($body),
            'content_type' => $contentType,
        ], self::CACHE_TTL_SECONDS);

        return response($body, 200, [
            'Content-Type' => $contentType,
            'Cache-Control' => 'public, max-age=86400',
        ]);
    }

    private function isAllowedCloudFrontUrl(string $url): bool
    {
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            return false;
        }

        $parts = parse_url($url);
        $scheme = strtolower((string) ($parts['scheme'] ?? ''));
        $host = strtolower((string) ($parts['host'] ?? ''));

        if (!in_array($scheme, ['http', 'https'], true)) {
            return false;
        }

        return $host !== '' && str_ends_with($host, 'cloudfront.net');
    }
}
