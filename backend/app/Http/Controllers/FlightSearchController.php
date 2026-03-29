<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class FlightSearchController extends Controller
{
     public function search(Request $request)
     {
          $request->validate([
               'from' => 'required|string|min:3|max:4',
               'to' => 'required|string|min:3|max:4',
               'date' => 'required|date_format:Y-m-d',
               'return_date' => 'nullable|date_format:Y-m-d',
               'adults' => 'nullable|integer|min:1|max:9',
               'currency' => 'nullable|string|size:3',
          ]);

          $from = strtoupper($request->from);
          $to = strtoupper($request->to);
          $date = $request->date;
          $returnDate = $request->return_date;
          $adults = $request->adults ?? 1;
          $currency = $request->currency ?? 'USD';
          $apiKey = env('SERPAPI_KEY', '');

          // ──────────────────────────────────────────────
          // If we have a real SerpAPI key → call the API
          // ──────────────────────────────────────────────
          if ($apiKey) {
               $params = [
                    'engine' => 'google_flights',
                    'departure_id' => $from,
                    'arrival_id' => $to,
                    'outbound_date' => $date,
                    'currency' => $currency,
                    'adults' => $adults,
                    'hl' => 'en',
                    'api_key' => $apiKey,
               ];

               if ($returnDate) {
                    $params['return_date'] = $returnDate;
                    $params['type'] = '1'; // round trip
               } else {
                    $params['type'] = '2'; // one way
               }

               $response = Http::timeout(15)->get('https://serpapi.com/search.json', $params);

               if ($response->failed()) {
                    return $this->error('Failed to fetch from SerpAPI', 502, ['details' => $response->body()]);
               }

               $serpData = $response->json();

               // Extract best_flights or other_flights
               $rawFlights = array_merge(
                    $serpData['best_flights'] ?? [],
                    $serpData['other_flights'] ?? []
               );

               $flights = array_map(function ($item) {
                    return self::normalizeSerpFlight($item);
               }, $rawFlights);

               return $this->success([
                    'source' => 'google_flights',
                    'from' => $from,
                    'to' => $to,
                    'date' => $serpData['search_parameters']['outbound_date'] ?? '',
                    'currency' => $serpData['search_parameters']['currency'] ?? 'USD',
                    'flights' => $flights,
                    'total' => count($flights),
               ]);
          }

          // ──────────────────────────────────────────────
          // FALLBACK: Realistic Mock Data
          // ──────────────────────────────────────────────
          return $this->success([
               'source' => 'mock',
               'from' => $from,
               'to' => $to,
               'date' => $date,
               'currency' => $currency,
               'flights' => self::getMockFlights($from, $to, $date, $adults),
               'total' => 6,
          ]);
     }

     // ──────────────────────────────────────────────────────
     // Normalize a SerpAPI flight object to our standard shape
     // ──────────────────────────────────────────────────────
     private static function normalizeSerpFlight(array $item): array
     {
          $firstLeg = $item['flights'][0] ?? [];
          $lastLeg = end($item['flights']) ?: [];

          return [
               'id' => md5(json_encode($item)),
               'airline' => $firstLeg['airline'] ?? 'Unknown',
               'airline_logo' => $firstLeg['airline_logo'] ?? '',
               'flight_number' => $firstLeg['flight_number'] ?? '',
               'from_airport' => $firstLeg['departure_airport']['name'] ?? '',
               'from_code' => $firstLeg['departure_airport']['id'] ?? '',
               'departure_time' => $firstLeg['departure_airport']['time'] ?? '',
               'to_airport' => $lastLeg['arrival_airport']['name'] ?? '',
               'to_code' => $lastLeg['arrival_airport']['id'] ?? '',
               'arrival_time' => $lastLeg['arrival_airport']['time'] ?? '',
               'duration' => round(($item['total_duration'] ?? 0) / 60, 1), // minutes → hours
               'duration_raw' => $item['total_duration'] ?? 0,
               'stops' => max(0, count($item['flights'] ?? []) - 1),
               'stop_names' => self::extractStopNames($item['flights'] ?? []),
               'price' => $item['price'] ?? 0,
               'price_per_person' => $item['price'] ?? 0,
               'travel_class' => $firstLeg['travel_class'] ?? 'Economy',
               'booking_token' => $item['booking_token'] ?? '',
               'carbon_emissions' => $item['carbon_emissions']['this_flight'] ?? null,
          ];
     }

     private static function extractStopNames(array $legs): array
     {
          if (count($legs) <= 1)
               return [];
          // stops are the arrival of each leg except the last
          $stops = [];
          for ($i = 0; $i < count($legs) - 1; $i++) {
               $stops[] = $legs[$i]['arrival_airport']['name'] ?? '';
          }
          return array_filter($stops);
     }

     // ──────────────────────────────────────────────────────
     // Realistic Mock Flights for demo / no-key fallback
     // ──────────────────────────────────────────────────────
     private static function getMockFlights(string $from, string $to, string $date, int $adults): array
     {
          $airlines = [
               ['name' => 'Emirates', 'logo' => 'https://www.gstatic.com/flights/airline_logos/70px/EK.png', 'code' => 'EK'],
               ['name' => 'Qatar Airways', 'logo' => 'https://www.gstatic.com/flights/airline_logos/70px/QR.png', 'code' => 'QR'],
               ['name' => 'Turkish Airlines', 'logo' => 'https://www.gstatic.com/flights/airline_logos/70px/TK.png', 'code' => 'TK'],
               ['name' => 'Lufthansa', 'logo' => 'https://www.gstatic.com/flights/airline_logos/70px/LH.png', 'code' => 'LH'],
               ['name' => 'Air France', 'logo' => 'https://www.gstatic.com/flights/airline_logos/70px/AF.png', 'code' => 'AF'],
               ['name' => 'British Airways', 'logo' => 'https://www.gstatic.com/flights/airline_logos/70px/BA.png', 'code' => 'BA'],
          ];

          $basePrices = [420, 380, 310, 550, 490, 295];
          $durations = [7.5, 9.0, 11.5, 6.0, 8.5, 13.0];
          $depTimes = ['06:30', '09:15', '13:00', '16:45', '20:10', '23:55'];
          $arrTimes = ['14:00', '18:15', '00:30', '22:45', '04:40', '13:55'];
          $stops = [0, 1, 1, 0, 0, 2];
          $classes = ['Economy', 'Economy', 'Economy', 'Business', 'Economy', 'Economy'];

          $results = [];
          foreach ($airlines as $i => $airline) {
               $price = ($basePrices[$i] * $adults);
               $results[] = [
                    'id' => 'mock_' . $i . '_' . md5($from . $to . $date),
                    'airline' => $airline['name'],
                    'airline_logo' => $airline['logo'],
                    'flight_number' => $airline['code'] . rand(100, 999),
                    'from_airport' => self::airportName($from),
                    'from_code' => $from,
                    'departure_time' => $date . ' ' . $depTimes[$i],
                    'to_airport' => self::airportName($to),
                    'to_code' => $to,
                    'arrival_time' => $date . ' ' . $arrTimes[$i],
                    'duration' => $durations[$i],
                    'duration_raw' => (int) ($durations[$i] * 60),
                    'stops' => $stops[$i],
                    'stop_names' => $stops[$i] > 0 ? ['Dubai'] : [],
                    'price' => $price,
                    'price_per_person' => $basePrices[$i],
                    'travel_class' => $classes[$i],
                    'booking_token' => '',
                    'carbon_emissions' => rand(150, 400) * 1000,
               ];
          }

          return $results;
     }

     private static function airportName(string $code): string
     {
          $map = [
               'CDG' => 'Paris Charles de Gaulle',
               'CAI' => 'Cairo International',
               'DXB' => 'Dubai International',
               'JFK' => 'New York John F. Kennedy',
               'LHR' => 'London Heathrow',
               'IST' => 'Istanbul Airport',
               'FRA' => 'Frankfurt Airport',
               'MAD' => 'Madrid Barajas',
               'FCO' => 'Rome Fiumicino',
               'AMS' => 'Amsterdam Schiphol',
               'NRT' => 'Tokyo Narita',
               'SYD' => 'Sydney Kingsford Smith',
               'GRU' => 'São Paulo Guarulhos',
               'JNB' => 'Johannesburg O.R. Tambo',
               'DEL' => 'Delhi Indira Gandhi',
               'PEK' => 'Beijing Capital',
               'LAX' => 'Los Angeles International',
               'BKK' => 'Bangkok Suvarnabhumi',
               'ICN' => 'Seoul Incheon',
               'SIN' => 'Singapore Changi',
               'DOH' => 'Doha Hamad International',
               'MNL' => 'Manila Ninoy Aquino',
               'BAH' => 'Bahrain International',
               'RUH' => 'Riyadh King Khalid',
               'CMN' => 'Casablanca Mohammed V',
               'NBO' => 'Nairobi Jomo Kenyatta',
               'YYZ' => 'Toronto Pearson',
               'MEX' => 'Mexico City Benito Juarez',
               'EZE' => 'Buenos Aires Ezeiza',
               'LIM' => 'Lima Jorge Chavez',
               'ACC' => 'Accra Kotoka',
               'TUN' => 'Tunis Carthage',
               'AUH' => 'Abu Dhabi International',
               'HKG' => 'Hong Kong International',
               'KUL' => 'Kuala Lumpur International',
               'MLE' => 'Malé Velana International',
               'CPT' => 'Cape Town International',
               'OSL' => 'Oslo Gardermoen',
               'ARN' => 'Stockholm Arlanda',
               'HEL' => 'Helsinki Vantaa',
               'KEF' => 'Reykjavik Keflavik',
               'WAW' => 'Warsaw Chopin',
               'PRG' => 'Prague Václav Havel',
               'BUD' => 'Budapest Ferenc Liszt',
               'OTP' => 'Bucharest Henri Coandă',
               'SOF' => 'Sofia Airport',
               'ZAG' => 'Zagreb Airport',
               'BEG' => 'Belgrade Nikola Tesla',
               'VCE' => 'Venice Marco Polo',
               'BCN' => 'Barcelona El Prat',
               'LIS' => 'Lisbon Humberto Delgado',
               'GVA' => 'Geneva Airport',
               'ZRH' => 'Zurich Airport',
               'BRU' => 'Brussels Airport',
          ];

          return $map[strtoupper($code)] ?? $code . ' International Airport';
     }
}
