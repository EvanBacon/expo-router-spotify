// import { Text, Image, View, ActivityIndicator } from 'react-native';
import { Card } from "@/components/card";
import { FlyoverCard } from "./flyover-map-spots";

// Function to fetch points of interest for a given city
export async function getPlacesInfo(
  city: string
): Promise<GooglePlacesResponse["results"]> {
  if (process.env.EXPO_PUBLIC_USE_DEBUG_FIXTURES) {
    return MOCK_LOCATION_DATA_VEGAS.results;
  }

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    city
  )}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Points of interest:", JSON.stringify(data));
    return data.results;
  } catch (error) {
    console.error("Error fetching points of interest:", error);
    return null;
  }
}

export function MapCard({
  city,
  data,
}: {
  city: string;
  data: PointOfInterestData[];
}) {
  return (
    <>
      <Card title={`Results for ${city}`} style={{ padding: 0, flex: 1 }}>
        <FlyoverCard
          locations={data
            .sort((a, b) => {
              return b.user_ratings_total - a.user_ratings_total;
            })

            .map((point) => ({
              icon: point.icon,
              rating: point.rating,
              // photo: point.photos?.[0]?.photo_reference,
              title: point.name,
              latitude: point.geometry.location.lat,
              longitude: point.geometry.location.lng,
            }))}
        />
      </Card>
    </>
  );
}

type PointOfInterestData = {
  business_status: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  photos: {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }[];
  place_id: string;
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  rating: number;
  reference: string;
  types: string[];
  user_ratings_total: number;
  opening_hours?: { open_now: boolean };
};

type GooglePlacesResponse = {
  html_attributions: string[];
  next_page_token: string;
  results: PointOfInterestData[];
  status: "OK";
};

export const MOCK_LOCATION_DATA_VEGAS: GooglePlacesResponse = {
  html_attributions: [],
  next_page_token:
    "ATplDJb5-BvTkGPE6N6zEYy7RDo24yUdKmo9I3c2exvIR8T4c8fcOmZJVPWO5A2jtBPNYAizQlwWZ33nnSfprboY9u1qetq7lXdSlTDC6CxvSm5yVCAoC2BSBuhF2vpBVemmAsvuxvfB62dwFva5dHROSuZx2ALyB4ac0lLQWeGpY1vL89mz5YXbEyyVJ4xpXbzXoDUVKY3S70IIf5M6y5B8BSnSHSlgWmQ3Ed4lxIEJ0qOJMLU8azgoquOqmW83u60XLFC6BAcw7NlE3pnu3p6ZZeFXiC7RmWH3H-A7-01xBK4Zx_3dKkzjTJbmJ5jHiyXnu_l_C6ECa1PQPV7b0IBlVCz7hXoxh671FVbTgMjgJ_uuXEyefx643ZqnHRdJjSv77EY-Ca0jhH9NfwE1H0Gtabuh6KtDihqOzA",
  results: [
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "3570 S Las Vegas Blvd, Paradise, NV 89109, United States",
      geometry: {
        location: { lat: 36.1172612, lng: -115.176141 },
        viewport: {
          northeast: { lat: 36.11805347989272, lng: -115.1734455 },
          southwest: { lat: 36.11535382010728, lng: -115.1770395 },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
      icon_background_color: "#909CE1",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
      name: "Caesars Palace",
      photos: [
        {
          height: 697,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/104238411188737351575">at Caesars Palace Hotel &amp; Casino</a>',
          ],
          photo_reference:
            "ATplDJZrZsfhGcdj2UlnhLsXQBGs7eOR5839Oy9pQzaizj85HDNia7YBrvJVFVkwzlMGrY5n2rqq5h_TYS-xXuktlToJoYpIyGN48c_M1iK7qdDJgJXA1B4FPTg1tJr9IgDa3aoKeRuQcMsGYpukcaMCEloCteJBL7jkiCQ2VB72wLH3s92O",
          width: 1239,
        },
      ],
      place_id: "ChIJleDKRDzEyIAR9z-vovLIyXc",
      plus_code: {
        compound_code: "4R8F+WG Paradise, Nevada",
        global_code: "85864R8F+WG",
      },
      rating: 4.5,
      reference: "ChIJleDKRDzEyIAR9z-vovLIyXc",
      types: [
        "casino",
        "tourist_attraction",
        "lodging",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 123973,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "3799 S Las Vegas Blvd, Las Vegas, NV 89109, United States",
      geometry: {
        location: { lat: 36.1036224, lng: -115.1675744 },
        viewport: {
          northeast: { lat: 36.1048465, lng: -115.1596887 },
          southwest: { lat: 36.09995009999999, lng: -115.1767687 },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "MGM Grand",
      opening_hours: { open_now: true },
      photos: [
        {
          height: 559,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/118151789717647838379">Matthew Arthur</a>',
          ],
          photo_reference:
            "ATplDJaO7AmkfI5hi464s94_KHe3N5kSgTBO88B3AG2IeM4bBlo3yhJx6uvmd5nwZYXFBDpRskntXM7EotHWsjjZEpHcSbcsZtBxcvJuS5e44-ousBEuGAe_kVtUkzvD7DkFG9Yq1P7PXEeb1fDYN6tFfJMjLrS3Pzxn1XMwIB8aaK3COdld",
          width: 815,
        },
      ],
      place_id: "ChIJJQ6Ck8zFyIARfxB2vQVF2Z0",
      plus_code: {
        compound_code: "4R3J+CX Las Vegas, Nevada",
        global_code: "85864R3J+CX",
      },
      rating: 4.4,
      reference: "ChIJJQ6Ck8zFyIARfxB2vQVF2Z0",
      types: ["casino", "lodging", "point_of_interest", "establishment"],
      user_ratings_total: 102031,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "3600 S Las Vegas Blvd, Las Vegas, NV 89109, United States",
      geometry: {
        location: { lat: 36.1129455, lng: -115.1765067 },
        viewport: {
          northeast: { lat: 36.11384087989272, lng: -115.1745077701073 },
          southwest: { lat: 36.11114122010728, lng: -115.1772074298927 },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
      icon_background_color: "#909CE1",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
      name: "Bellagio Hotel & Casino",
      photos: [
        {
          height: 2533,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/112735956980544865815">A Google User</a>',
          ],
          photo_reference:
            "ATplDJbCIyZLmOnSez7v5CgiWsZ2MdeMhyOnSwpjtC17F-E6xsBo7x22CRrdHTu8kItV2atpxlRhWs7za-aRfpLnlskgj_7fipsXq8wvFTYaE5EZxl1_NOjf1qyU3rpy7hQmpwvnXCP5eJhQfxWJEEnK4qvfcWQATiqUJfjrTZQ70VVZ8TFT",
          width: 3800,
        },
      ],
      place_id: "ChIJvUdRyzDEyIARhA3R2cXH8oI",
      plus_code: {
        compound_code: "4R7F+59 Las Vegas, Nevada",
        global_code: "85864R7F+59",
      },
      rating: 4.7,
      reference: "ChIJvUdRyzDEyIARhA3R2cXH8oI",
      types: ["casino", "lodging", "point_of_interest", "establishment"],
      user_ratings_total: 132189,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "3730 S Las Vegas Blvd, Las Vegas, NV 89158, United States",
      geometry: {
        location: { lat: 36.1073702, lng: -115.1767526 },
        viewport: {
          northeast: { lat: 36.10906877989271, lng: -115.1750012 },
          southwest: { lat: 36.10636912010727, lng: -115.1782684 },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
      icon_background_color: "#909CE1",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
      name: "ARIA Resort & Casino",
      opening_hours: { open_now: true },
      photos: [
        {
          height: 400,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/104202556720558053173">A Google User</a>',
          ],
          photo_reference:
            "ATplDJbB24d355g-G79P0gsVbsqfbWT8Qt-U_Go6Ta4YbFELg86uIevLHl-4ngMuAcuj0jzD5o0Cdyh4JFdAhPvC7WCOyDXVonBYy5NiLH4-7LUkrXA6i5VO2q2RDeOlQbgnkh-8Lq_Z68sJj01Zz79Z6FR6wxMoebHqKE6LYXX7oMDE96_k",
          width: 703,
        },
      ],
      place_id: "ChIJhWQVHS7EyIARbwWzRC-I8y4",
      plus_code: {
        compound_code: "4R4F+W7 Las Vegas, Nevada",
        global_code: "85864R4F+W7",
      },
      rating: 4.5,
      reference: "ChIJhWQVHS7EyIARbwWzRC-I8y4",
      types: ["casino", "lodging", "point_of_interest", "establishment"],
      user_ratings_total: 41027,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "3900 S Las Vegas Blvd, Las Vegas, NV 89119, United States",
      geometry: {
        location: { lat: 36.09551, lng: -115.1760672 },
        viewport: {
          northeast: { lat: 36.09789434999999, lng: -115.1727881 },
          southwest: { lat: 36.09464735000002, lng: -115.1797133 },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
      icon_background_color: "#909CE1",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
      name: "Luxor Hotel & Casino",
      photos: [
        {
          height: 1195,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/104615918342950519458">A Google User</a>',
          ],
          photo_reference:
            "ATplDJbAlcDzKMoCfZuvUMw9x4sLaxZ0eyCwAoovRA9ToW1g1yr3p2ZsTfD2b7a2xYcjfvtbpxwURJeUtVkWh-R-qR61jtVp54th00v7RvtHbfZqc6Lt0HATPu07whMCPYb7SGy6xvOvZyWakdcP32fNS8TS0UStJ1NPzOJBxRcH-ougRoez",
          width: 2119,
        },
      ],
      place_id: "ChIJR7RcPs7FyIAROAHQry50Wgs",
      plus_code: {
        compound_code: "3RWF+6H Las Vegas, Nevada",
        global_code: "85863RWF+6H",
      },
      rating: 4.2,
      reference: "ChIJR7RcPs7FyIAROAHQry50Wgs",
      types: ["casino", "lodging", "point_of_interest", "establishment"],
      user_ratings_total: 93396,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "3850 S Las Vegas Blvd, Las Vegas, NV 89109, United States",
      geometry: {
        location: { lat: 36.0987973, lng: -115.1754312 },
        viewport: {
          northeast: { lat: 36.10218965, lng: -115.1700708 },
          southwest: { lat: 36.09592265, lng: -115.1826308 },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
      icon_background_color: "#909CE1",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
      name: "Excalibur Hotel & Casino",
      photos: [
        {
          height: 1800,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/101891918701369338215">Excalibur Hotel &amp; Casino</a>',
          ],
          photo_reference:
            "ATplDJb1TywW7Vy2Nkl-SaKl0m2EqA8u_nV3fwenD4dlrdaYOr1khdjzo98Ksut23YzOepKlz73smzpLZ6G2VAQFCZwtmRAeI5WqAM4TXVf7DZlnx6KnpXs1H7eJ7dcSHfFPD8bB_QKFGs3x8BFuztKwHlqxrh4AP121fBj_rZCObK9VdrvS",
          width: 2880,
        },
      ],
      place_id: "ChIJzZtJhM3FyIAR6eHpF4xTR68",
      plus_code: {
        compound_code: "3RXF+GR Las Vegas, Nevada",
        global_code: "85863RXF+GR",
      },
      rating: 4.1,
      reference: "ChIJzZtJhM3FyIAR6eHpF4xTR68",
      types: ["casino", "lodging", "point_of_interest", "establishment"],
      user_ratings_total: 75427,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "3400 S Las Vegas Blvd, Las Vegas, NV 89109, United States",
      geometry: {
        location: { lat: 36.1216343, lng: -115.1763346 },
        viewport: {
          northeast: { lat: 36.1234185, lng: -115.17101305 },
          southwest: { lat: 36.1186757, lng: -115.17810845 },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "The Mirage",
      opening_hours: {},
      photos: [
        {
          height: 683,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/116667282711276222360">A Google User</a>',
          ],
          photo_reference:
            "ATplDJZncH4Qn58O_n4dj3MsGfuwlPDDs66wjgCmlTcx0pTnnZVZJ9CHlLuN5Pc-rTbbruJBdBCEcP0T2PwWX5Wst3fQeCidnNHtYo3wuFLiSuDMOR9L0hxJ7iakkcwT_XU1Xd5KYB9vkMM21_YGFE01pV0oiCCsCmYJN5rQJV7g4yHtufqH",
          width: 1024,
        },
      ],
      place_id: "ChIJdyyk8BXEyIARY72Zdyqd_m0",
      plus_code: {
        compound_code: "4RCF+MF Las Vegas, Nevada",
        global_code: "85864RCF+MF",
      },
      rating: 4.4,
      reference: "ChIJdyyk8BXEyIARY72Zdyqd_m0",
      types: ["casino", "lodging", "point_of_interest", "establishment"],
      user_ratings_total: 45357,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "3300 Las Vegas Blvd S, Las Vegas, NV 89109, United States",
      geometry: {
        location: { lat: 36.1247462, lng: -115.1720827 },
        viewport: {
          northeast: { lat: 36.12570997989272, lng: -115.16879695 },
          southwest: { lat: 36.12301032010728, lng: -115.17481995 },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
      icon_background_color: "#909CE1",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
      name: "Treasure Island - TI Las Vegas Hotel & Casino, a Radisson Hotel",
      photos: [
        {
          height: 3840,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/115204994589000399900">A Google User</a>',
          ],
          photo_reference:
            "ATplDJaoubxo7Xj0oZLRQpMyGWZuO_1kWU6YV-6Zquhsruk_l4VD1qrwfoRilVo4K0M2VAcRSoUqIUgCqVbyX1uhal3FxexsOiP_jIDftHXHkYChK4UPBZPFg5GLHCtEltfg9aICAUo0aYGz20uIbJ63XeXkLNCYHNGo1xThiWLrb2VHymFR",
          width: 5760,
        },
      ],
      place_id: "ChIJswuaqjrEyIARE0cTvGmUiwk",
      plus_code: {
        compound_code: "4RFH+V5 Las Vegas, Nevada",
        global_code: "85864RFH+V5",
      },
      rating: 4.2,
      reference: "ChIJswuaqjrEyIARE0cTvGmUiwk",
      types: ["casino", "lodging", "point_of_interest", "establishment"],
      user_ratings_total: 56646,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "2000 Las Vegas Blvd S, Las Vegas, NV 89104, United States",
      geometry: {
        location: { lat: 36.1475119, lng: -115.1565537 },
        viewport: {
          northeast: { lat: 36.14861212989273, lng: -115.1550367201072 },
          southwest: { lat: 36.14591247010728, lng: -115.1577363798927 },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
      icon_background_color: "#909CE1",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
      name: "The STRAT Hotel, Casino & Tower",
      photos: [
        {
          height: 6311,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/107962581989440909956">Stratosphere Casino, Hotel &amp; Tower</a>',
          ],
          photo_reference:
            "ATplDJaWE7Dzattajpp-tz3giG-7o8ODShU0RJrzLVIhXEc2mJ2WwsMGQNiTdDbl6ezSICpqA98USVmUJGm0HeuxCHa5JrA53RMCxIKvS7GXaiwmzBAokoqLxaXoyZzHXWsVS5pFl52pDhDZri1LD2cZ0JwKmqRhzGajmGdH2U__V2a0lXEl",
          width: 9466,
        },
      ],
      place_id: "ChIJ8-0pEYjDyIARB4jQJR4xnxs",
      plus_code: {
        compound_code: "4RXV+29 Las Vegas, Nevada",
        global_code: "85864RXV+29",
      },
      rating: 4,
      reference: "ChIJ8-0pEYjDyIARB4jQJR4xnxs",
      types: ["lodging", "point_of_interest", "establishment"],
      user_ratings_total: 59264,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "3475 Las Vegas Blvd S, Las Vegas, NV 89109, United States",
      geometry: {
        location: { lat: 36.1194645, lng: -115.1716391 },
        viewport: {
          northeast: { lat: 36.12098389999998, lng: -115.16836175 },
          southwest: { lat: 36.1176491, lng: -115.17417635 },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
      icon_background_color: "#909CE1",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
      name: "Harrah's Las Vegas",
      photos: [
        {
          height: 940,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/109555841946625695914">A Google User</a>',
          ],
          photo_reference:
            "ATplDJbA90N37XxWIsJ1jAJHH7RhW0_5somxmrpYP2Yut-kf3yBn3BU66J7xZ4HQbKRc-hMgiI8pWnLGwM-VGPxJIPFe9rK3UfMwInrXOR0_rK8DW3q52ps6gXiFHlgHR3Bgh8vNUBRc_gKL_8pj2v4J84vIBds4FGroO6JnQRg8kd0aVhjJ",
          width: 1671,
        },
      ],
      place_id: "ChIJWxuQMDzEyIARsw492ihhHOE",
      plus_code: {
        compound_code: "4R9H+Q8 Las Vegas, Nevada",
        global_code: "85864R9H+Q8",
      },
      rating: 4.1,
      reference: "ChIJWxuQMDzEyIARsw492ihhHOE",
      types: ["lodging", "point_of_interest", "establishment"],
      user_ratings_total: 28050,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "3655 S Las Vegas Blvd, Las Vegas, NV 89109, United States",
      geometry: {
        location: { lat: 36.112462, lng: -115.1707075 },
        viewport: {
          northeast: { lat: 36.11351762989273, lng: -115.1697913701072 },
          southwest: { lat: 36.11081797010728, lng: -115.1724910298927 },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
      icon_background_color: "#909CE1",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
      name: "Paris Las Vegas",
      photos: [
        {
          height: 1498,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/106193180204810530940">Paris Las Vegas</a>',
          ],
          photo_reference:
            "ATplDJaT8p_fXIGwwVDkXGPzyL7ER0pMknObub-rNMBEk9WY5-ulRLwqMxbBB1A7N28rB57vnWqi6UVd_c3hyiuU5rU-PaMiVxkvrHBtlcIkdikl8PD8rKwnCsD-Yfv6IPkdQ_b5nlp1zlqij2rQ7UX5bnb4KLMJCNfamRYvczBgTWZazeBD",
          width: 2247,
        },
      ],
      place_id: "ChIJAQAAAGzDyIARAVwe_ga0REU",
      plus_code: {
        compound_code: "4R6H+XP Las Vegas, Nevada",
        global_code: "85864R6H+XP",
      },
      rating: 4.4,
      reference: "ChIJAQAAAGzDyIARAVwe_ga0REU",
      types: [
        "casino",
        "tourist_attraction",
        "lodging",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 71286,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "3645 Las Vegas Blvd S, Las Vegas, NV 89109, United States",
      geometry: {
        location: { lat: 36.1140611, lng: -115.170627 },
        viewport: {
          northeast: { lat: 36.11557697989272, lng: -115.1688301701073 },
          southwest: { lat: 36.11287732010728, lng: -115.1715298298927 },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
      icon_background_color: "#909CE1",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
      name: "Horseshoe Las Vegas",
      photos: [
        {
          height: 1080,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/106085787263229717999">Bally&#39;s</a>',
          ],
          photo_reference:
            "ATplDJaFYygiIAJ8d9d1p7FHqCgicCcMf2jYUMPnSSdIkoiz6plHF2KLNxPz4ekdknd6SN_vPG5ceNe0_6RZvEhZQb0IEcs7s700tclYrMv0tsAoYpFIDt-liIuT69k5blvJwhnwZAIL0nCjHu1FyukgiDmMfb3K_cc8sWWYzhTzzY_P8TT6",
          width: 1920,
        },
      ],
      place_id: "ChIJJ9M69znEyIAR4JClP57b-W0",
      plus_code: {
        compound_code: "4R7H+JP Las Vegas, Nevada",
        global_code: "85864R7H+JP",
      },
      rating: 4.1,
      reference: "ChIJJ9M69znEyIAR4JClP57b-W0",
      types: ["casino", "lodging", "point_of_interest", "establishment"],
      user_ratings_total: 31411,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address: "202 Fremont St, Las Vegas, NV 89101, United States",
      geometry: {
        location: { lat: 36.1698695, lng: -115.1437062 },
        viewport: {
          northeast: { lat: 36.17107132989273, lng: -115.1421058701073 },
          southwest: { lat: 36.16837167010728, lng: -115.1448055298927 },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
      icon_background_color: "#909CE1",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
      name: "Four Queens Hotel & Casino",
      opening_hours: { open_now: true },
      photos: [
        {
          height: 500,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/112974578158767483126">A Google User</a>',
          ],
          photo_reference:
            "ATplDJYxjqFBtcQxmIq6Sz0858ogMdRBl54kdnyyG0H3cIoGoz3h5ydUl0_d-O6Jn48iKkIpgG15o8eFGt5WoNFPQi177IrOsTfKlBCVIBwcGD_EPLqmwSUYESQstD7cpZw2soK6trEVaLO3q83muWsC-AgUsmlGATNYvtu7lZYtz10kb20s",
          width: 1500,
        },
      ],
      place_id: "ChIJhW4Al5_DyIAR5N16Bip25IU",
      plus_code: {
        compound_code: "5V94+WG Las Vegas, Nevada",
        global_code: "85865V94+WG",
      },
      rating: 4.2,
      reference: "ChIJhW4Al5_DyIAR5N16Bip25IU",
      types: [
        "casino",
        "tourist_attraction",
        "bar",
        "lodging",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 18813,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "3700 W Flamingo Rd, Las Vegas, NV 89103, United States",
      geometry: {
        location: { lat: 36.1175148, lng: -115.1881593 },
        viewport: {
          northeast: { lat: 36.12348965, lng: -115.18187175 },
          southwest: { lat: 36.11269705000001, lng: -115.19254315 },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
      icon_background_color: "#909CE1",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
      name: "Rio Hotel & Casino",
      photos: [
        {
          height: 2101,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/113023055460963855168">Rio All-Suites Hotel and Casino</a>',
          ],
          photo_reference:
            "ATplDJZzG6G4tosFUytIlO-Rl9oCV_-HMJjumEF95OFDk1mhPt8T_d871gpJ0iTLPFYOpKEX6RU2rrFX77zvP09Szx3GqVBEQ07OijCJAwaTW9-XHiDneyeMFvMtWaw-i2nO0TVvFtKMgsdjXY37x1bULSt4PIdQ1lTHo076iFA5BySJO87a",
          width: 3000,
        },
      ],
      place_id: "ChIJX8LqCCDEyIARtXpjW9_P7YQ",
      plus_code: {
        compound_code: "4R96+2P Las Vegas, Nevada",
        global_code: "85864R96+2P",
      },
      rating: 3.9,
      reference: "ChIJX8LqCCDEyIARtXpjW9_P7YQ",
      types: ["casino", "lodging", "point_of_interest", "establishment"],
      user_ratings_total: 41391,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "3770 S Las Vegas Blvd, Las Vegas, NV 89109, United States",
      geometry: {
        location: { lat: 36.1044046, lng: -115.1766692 },
        viewport: {
          northeast: { lat: 36.10584047989272, lng: -115.1756868201073 },
          southwest: { lat: 36.10314082010728, lng: -115.1783864798927 },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
      icon_background_color: "#909CE1",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
      name: "Park MGM Las Vegas",
      photos: [
        {
          height: 800,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/103833241887942909432">A Google User</a>',
          ],
          photo_reference:
            "ATplDJZPbieo_cSidUHKwe7d-dycDIQhA8DwVyzYAlbwk_Rw1kWs1h79koJg9JQXowmuC-ESiG4u48ctxZqAlT5k0-YnpWnhGVoFjcP3D7ZlRWbE9PsNYpOpI6x2FmiM1bFvT3--0eTTDmNoeNltvQSWdXy3BajTaM1e9923q_iUh41gP7rL",
          width: 1422,
        },
      ],
      place_id: "ChIJnTYOcDLEyIARyBsR3myo3eI",
      plus_code: {
        compound_code: "4R3F+Q8 Las Vegas, Nevada",
        global_code: "85864R3F+Q8",
      },
      rating: 4.2,
      reference: "ChIJnTYOcDLEyIARyBsR3myo3eI",
      types: ["casino", "lodging", "point_of_interest", "establishment"],
      user_ratings_total: 26388,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address: "206 N 3rd St, Las Vegas, NV 89101, United States",
      geometry: {
        location: { lat: 36.1716389, lng: -115.1416128 },
        viewport: {
          northeast: { lat: 36.17279707989272, lng: -115.1405047201073 },
          southwest: { lat: 36.17009742010728, lng: -115.1432043798927 },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
      icon_background_color: "#909CE1",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
      name: "Downtown Grand Hotel & Casino",
      opening_hours: { open_now: true },
      photos: [
        {
          height: 675,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/112909059253192036691">A Google User</a>',
          ],
          photo_reference:
            "ATplDJaobUSKeHIBcYBQsX9EjesOhwQUv3ODwKMtOXmGJIkrFU87RYyQRRljZaDLV_11cnSrS0r5eBMbF7oaE8YBBlrtAUm9TzoGsSz-vF4KWQkf_dhSg1f6HeXTHOB6EtTKAgNhsDzwyR8zzCj1DBvza_xR2Vznzb6RxcORTstdcfjD2HQ7",
          width: 1200,
        },
      ],
      place_id: "ChIJI9tTB6DDyIARBYf7r_X-rdE",
      plus_code: {
        compound_code: "5VC5+M9 Las Vegas, Nevada",
        global_code: "85865VC5+M9",
      },
      rating: 4.2,
      reference: "ChIJI9tTB6DDyIARBYf7r_X-rdE",
      types: ["casino", "lodging", "point_of_interest", "establishment"],
      user_ratings_total: 11127,
    },
  ],
  status: "OK",
};
