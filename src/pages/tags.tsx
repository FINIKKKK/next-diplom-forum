import React from "react";
import { NextPage } from "next";

import { TTag } from "@/utils/api/models/tag/types";
import { FiltersLayout } from "@/layouts/FiltersLayout";
import { Tag } from "@/components";

interface TagsPageProps {}

const TagsPage: NextPage<TagsPageProps> = ({}) => {
  const [tags, setTags] = React.useState<TTag[]>([]);

  return (
    <FiltersLayout type="tag" limit={6} label="Все метки" setItems={setTags}>
      <div className="tags">
        {tags.map((obj: TTag) => (
          <Tag key={obj.id} {...obj} />
        ))}
      </div>
    </FiltersLayout>
  );
};

export default TagsPage;
