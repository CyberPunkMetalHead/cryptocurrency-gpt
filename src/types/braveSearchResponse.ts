export type SearchResult = {
  title: string;
  description: string;
  meta_url: string;
};

export type SearchResponse = {
  data: {
    query: {
      original: string;
      show_strict_warning: boolean;
      is_navigational: boolean;
      is_news_breaking: boolean;
      spellcheck_off: boolean;
      country: string;
      bad_results: boolean;
      should_fallback: boolean;
      postal_code: string;
      city: string;
      header_country: string;
      more_results_available: boolean;
      state: string;
    };
    mixed: {
      type: "mixed";
      main: Array<object>;
      top: Array<object>;
      side: Array<object>;
    };
    videos: {
      type: "videos";
      results: SearchResult[];
      mutated_by_goggles: boolean;
    };
    web: {
      type: "search";
      results: SearchResult[];
      family_friendly: boolean;
    };
  };
};
