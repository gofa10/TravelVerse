<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class AuditTripImages extends Command
{
    protected $signature = 'trips:audit-images';

    protected $description = 'Audit trip image URLs and export categorized diagnostics CSV';

    public function handle(): int
    {
        $tripImageRows = DB::table('trips as t')
            ->leftJoin('images as i', function ($join) {
                $join->on('i.imageable_id', '=', 't.id')
                    ->where(function ($query) {
                        $query->where('i.imageable_type', 'trip')
                            ->orWhere('i.imageable_type', 'App\\Models\\Trip')
                            ->orWhere('i.imageable_type', 'App\Models\Trip')
                            ->orWhereRaw('LOWER(i.imageable_type) = ?', ['trip']);
                    });
            })
            ->select(
                't.id',
                't.name_en',
                't.name_ar',
                'i.url as image_url'
            )
            ->orderBy('t.id')
            ->get();

        $rows = [];
        $summary = [
            'LOCAL' => 0,
            'CDN' => 0,
            'MISSING' => 0,
        ];

        foreach ($tripImageRows as $row) {
            $imageUrl = is_string($row->image_url) ? trim($row->image_url) : null;
            $category = $this->categorizeImageUrl($imageUrl);
            $summary[$category]++;

            $rows[] = [
                'id' => $row->id,
                'name' => $row->name_en ?: ($row->name_ar ?: 'Untitled'),
                'image_url' => $imageUrl ?? '',
                'category' => $category,
                'suggested_action' => $this->suggestedAction($category),
            ];
        }

        $this->table(
            ['Metric', 'Count'],
            [
                ['Total records checked', count($rows)],
                ['LOCAL', $summary['LOCAL']],
                ['CDN', $summary['CDN']],
                ['MISSING', $summary['MISSING']],
            ]
        );

        $csvPath = 'image-audit.csv';
        $this->exportCsv($csvPath, $rows);

        $this->info('CSV exported to: ' . storage_path('app/' . $csvPath));

        return self::SUCCESS;
    }

    private function categorizeImageUrl(?string $imageUrl): string
    {
        if (!$imageUrl || $this->isClearlyBrokenPath($imageUrl)) {
            return 'MISSING';
        }

        if ($this->isLocalPath($imageUrl)) {
            return 'LOCAL';
        }

        if ($this->isExternalCdnOrDomain($imageUrl)) {
            return 'CDN';
        }

        return 'MISSING';
    }

    private function isClearlyBrokenPath(string $imageUrl): bool
    {
        $value = strtolower(trim($imageUrl));

        return $value === ''
            || $value === 'null'
            || $value === 'undefined'
            || $value === 'n/a'
            || $value === '#';
    }

    private function isLocalPath(string $imageUrl): bool
    {
        $trimmed = trim($imageUrl);

        if (str_starts_with($trimmed, '/storage/') || str_starts_with($trimmed, 'storage/')) {
            return true;
        }

        if (str_starts_with($trimmed, 'http://') || str_starts_with($trimmed, 'https://')) {
            $parts = parse_url($trimmed);
            $path = $parts['path'] ?? '';
            $host = $parts['host'] ?? '';

            $appHost = parse_url(config('app.url'), PHP_URL_HOST);
            if ($appHost && $host === $appHost && str_starts_with($path, '/storage/')) {
                return true;
            }
        }

        return false;
    }

    private function isExternalCdnOrDomain(string $imageUrl): bool
    {
        if (!str_starts_with($imageUrl, 'http://') && !str_starts_with($imageUrl, 'https://')) {
            return false;
        }

        $parts = parse_url($imageUrl);
        $host = strtolower($parts['host'] ?? '');

        if ($host === '') {
            return false;
        }

        $appHost = strtolower((string) parse_url(config('app.url'), PHP_URL_HOST));
        if ($appHost !== '' && $host === $appHost) {
            return false;
        }

        $knownCdnMarkers = [
            'cloudfront.net',
            'cdn.',
            'akamai',
            'fastly',
            'cloudflare',
            'imgix',
        ];

        foreach ($knownCdnMarkers as $marker) {
            if (str_contains($host, $marker)) {
                return true;
            }
        }

        // Treat any non-local absolute domain as external CDN/source for migration.
        return true;
    }

    private function suggestedAction(string $category): string
    {
        return match ($category) {
            'CDN' => 'migrate to local storage',
            'MISSING' => 'upload image manually',
            default => 'ok',
        };
    }

    private function exportCsv(string $path, array $rows): void
    {
        $handle = fopen('php://temp', 'w+');

        fputcsv($handle, ['id', 'name', 'image_url', 'category', 'suggested_action']);

        foreach ($rows as $row) {
            fputcsv($handle, [
                $row['id'],
                $row['name'],
                $row['image_url'],
                $row['category'],
                $row['suggested_action'],
            ]);
        }

        rewind($handle);
        $csv = stream_get_contents($handle);
        fclose($handle);

        file_put_contents(storage_path('app/' . $path), $csv ?: '');
    }
}
