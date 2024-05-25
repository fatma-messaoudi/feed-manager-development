'use client';

import React, { useEffect, useState } from 'react';
import { fetchClientData, urlFor } from '@/utils';
import { useFeedContext } from '@/context/FeedContext';
import Image from 'next/image';
import MuxPlayer from '@mux/mux-player-react';

// Define types for the props and state
interface PlanProps {
    slug: string;
}

interface Post {
    _key: string;
    date: string;
    caption: string;
    media: Array<{
        _type: string;
        asset: {
            _ref: string;
            playbackId?: string;
        };
        video?: {
            asset: {
                playbackId: string;
            };
        };
    }>;
}

interface GroupedPosts {
    [key: string]: Post[];
}

const Plan: React.FC<PlanProps> = ({ slug }) => {
    const { client, setClient } = useFeedContext();

    const [groupedPosts, setGroupedPosts] = useState<GroupedPosts>({});

    useEffect(() => {
        const groupPostsByMonthYear = (posts: Post[]): GroupedPosts => {
            return posts.reduce((acc: GroupedPosts, post: Post) => {
                const date = new Date(post.date);
                const month = date.toLocaleString('default', { month: 'long' });
                const year = date.getFullYear();
                const key = `${month} ${year}`;

                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(post);

                return acc;
            }, {});
        };

        if (client && client.posts) {
            const grouped = groupPostsByMonthYear(client.posts);
            setGroupedPosts(grouped);
        }
    }, [client]);

    useEffect(() => {
        fetchClientData(slug, setClient);
    }, [slug, setClient]);

    return (
        <div className='bg-[#000] overflow-x-hidden'>
            <div className='lg:mt-[60px] mt-5'>
                {Object.entries(groupedPosts).map(([monthYear, posts]) => (
                    <div key={monthYear} className='mb-8'>
                        <h2 className='text-white text-xl ml-4 pl-4 bg-[#facc0067] rounded-md'>{monthYear}</h2>
                        <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-2 mt-4 px-4 lg:w-[700px]'>
                            {posts.map((post) => (
                                <div key={post._key} className='relative'>
                                    {post.media && post.media.length > 0 && (
                                        <div className='lg:w-[200px] lg:h-[200px] md:w-[100px] md:h-[100px]'>
                                            {post.media[0]._type === 'clientImage' && (
                                                <Image
                                                    className='object-cover lg:w-[200px] lg:h-[200px] md:w-[100px] md:h-[100px]'
                                                    src={urlFor(post.media[0].asset._ref).url()}
                                                    alt={post.caption}
                                                    width={300}
                                                    height={300}
                                                />
                                            )}
                                            {post.media[0]._type === 'video' && (
                                                <MuxPlayer
                                                    className='lg:w-[200px] lg:h-[200px] md:w-[100px] md:h-[100px]'
                                                    playbackId={post.media[0].video?.asset.playbackId}
                                                />
                                            )}
                                        </div>
                                    )}
                                    
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Plan;
