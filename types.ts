export interface Speaker {
  code: string;
  name: string;
  biography: string;
  avatar: string | null;
}

export interface Result {
  code: string;
  speakers: [
    {
      code: string;
      name: string;
      biography: string;
      avatar: string | null;
    }
  ];
  title: string;
  submission_type: string;
  track: string;
  state: string;
  abstract: string;
  description: string;
  duration: number;
  slot_count: number;
  do_not_record: boolean;
  is_featured: boolean;
  content_locale: string;
  slot: {
    room: {
      en: string;
    };
    start: string;
    end: string;
  };
  image: string | null;
  resources: {
    resource: string;
    description: string;
  };
}

export type Talks = Result[];
