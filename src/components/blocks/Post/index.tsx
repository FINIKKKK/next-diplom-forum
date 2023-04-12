import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { useTimeNow } from '@/hooks/useTimeNow';
import { TPost } from '@/utils/api/models/post/types';

import ss from './Post.module.scss';

interface PostProps {
  post: TPost;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const date = useTimeNow(post.createdAt);

  return (
    <div className={ss.post}>
      <Link className={ss.image} href={`/posts/${post.slug}`}>
        <Image src={post.image} alt="image" width={1150} height={650} />
      </Link>

      <div className={ss.info}>
        <Link
          className={ss.category}
          href={`/feed?category=${post.category.value}`}
        >
          {post.category.label}
        </Link>

        <div className={ss.info__extra}>
          <Link className={ss.userName} href={`/users/${post.user.login}`}>
            {post.user.name ? post.user.name : `@${post.user.login}`}
          </Link>
          <div className={ss.date}>{date}</div>
        </div>
      </div>

      <h2 className={ss.title}>
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h2>

      <p className={ss.text}>{post.description}</p>

      <div className={ss.footer}>
        <ul className={ss.tags}>
          {post.tags.map((obj) => (
            <li key={obj.id} className={`tag hover ${ss.tag}`}>
              <Link href={`/feed?tagBy=${obj.name}`}>{obj.name}</Link>
            </li>
          ))}
        </ul>
        <ul className={ss.statistic}>
          <li className={ss.item}>
            <svg className={ss.views__icon} width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#eye" />
            </svg>
            <p>{post.views}</p>
          </li>
          <li className={`${ss.item__hover} ${ss.item}`}>
            <svg className={ss.favorites__icon} width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#favorite2" />
            </svg>
            <p>0</p>
          </li>
          <li className={ss.item}>
            <svg className={ss.comments__icon} width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#comments" />
            </svg>
            <p>{post.commentsCount}</p>
          </li>
          <li className={`${ss.item__hover} ${ss.item}`}>
            <svg width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#share" />
            </svg>
          </li>
        </ul>
      </div>
    </div>
  );
};
