import { useState, useEffect } from "react";
import { PUBLIC_COUNTRY_API_URL } from "../constants";

interface Country {
  iso2: string;
  iso3: string;
  name: string;
  states: {
    name: string;
    ["state_code"]: string;
  }[];
}

export const useGetCountriesAndStates = (
  onError: (error: any) => void
): [Country[], boolean] => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(PUBLIC_COUNTRY_API_URL);
        const json = await response.json();
        const data = json.data as Country[];
        const refinedCountries = data.map((country) =>
          country.iso3 === "COD" ? { ...country, name: "DR Congo" } : country
        );
        setCountries(refinedCountries);
        setLoading(false);
      } catch (error) {
        onError(error);
      }
    }
    fetchData();
  }, []);

  return [countries, loading];
};
