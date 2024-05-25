'use client';
import { Navbar2 } from '@/components';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { TemplateParams } from '@/types';
import { fetchClientData, sendEmail, urlFor } from '@/utils';
import { useFeedContext } from '@/context/FeedContext';
import MuxPlayer from '@mux/mux-player-react';
import Plan from '@/components/plan/Plan';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownShortWide, faTableCells } from '@fortawesome/free-solid-svg-icons';

const Feed = ({ slug }: any) => {
    const { client, setClient } = useFeedContext();

    const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(null);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);
    const [selectedDesc, setSelectedDesc] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [formData, setFormData] = useState<string>('');
    const [isPlanValidated, setIsPlanValidated] = useState<boolean>(false);
    const [reclamationSent, setReclamationSent] = useState<boolean>(false);
    const [reclamationMessage, setReclamationMessage] = useState<boolean>(false);
    const [viewMode, setViewMode] = useState<'grid' | 'plan'>('grid'); // State to toggle between views

    const handleMediaClick = (postIndex: number, mediaIndex: number, caption: string, date: string) => {
        // Adjust the index for the reversed array
        const actualPostIndex = client.posts.length - 1 - postIndex;

        setSelectedPostIndex(actualPostIndex);
        setSelectedMediaIndex(mediaIndex);
        setSelectedDesc(caption);

        const dateObject = new Date(date);
        const formattedDate = `${String(dateObject.getDate()).padStart(2, '0')}/${String(dateObject.getMonth() + 1).padStart(2, '0')}/${dateObject.getFullYear()}`;
        const formattedTime = formatDateTime(date);

        setSelectedDate(`${formattedDate} ${formattedTime}`);
    };

    const formatDateTime = (time: string) => {
        const date = new Date(time);
        const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        return formattedTime;
    };

    const closeModal = () => {
        setSelectedPostIndex(null);
        setSelectedMediaIndex(null);
    };

    const navigateMedia = (direction: 'next' | 'prev') => {
        if (client && client.posts && selectedPostIndex !== null && selectedMediaIndex !== null) {
            const mediaArray = client.posts[selectedPostIndex].media;
            const newIndex = direction === 'next'
                ? (selectedMediaIndex + 1) % mediaArray.length
                : (selectedMediaIndex - 1 + mediaArray.length) % mediaArray.length;
            setSelectedMediaIndex(newIndex);
        }
    };

    useEffect(() => {
        fetchClientData(slug, setClient);
    }, [slug]);

    const handlePlanValider = () => {
        if (client && !isPlanValidated) {
            const templateParams: TemplateParams = {
                to_email: 'feed.m@hotmail.com',
                from_name: client.name || '',
                message: `plan validé.`,
            };
            const templateId = 'template_mytzb3f';
            sendEmail(templateParams, setSuccessMessage, templateId);
            setIsPlanValidated(true);
        }
    };

    const handleReclamation = () => {
        setShowForm(true);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (client) {
            const templateParams: TemplateParams = {
                to_email: 'feed.m@hotmail.com',
                from_name: client.name || '',
                message: formData,
            };
            const templateId = 'template_kue1iq8';
            sendEmail(templateParams, setSuccessMessage, templateId);
            setFormData('');
            setShowForm(false);
            setReclamationSent(true);
            setReclamationMessage(true);
            setTimeout(() => {
                setReclamationMessage(false);
            }, 5000);
        }
    };

    return (
        <div className='bg-[#000] overflow-x-hidden'>
            <Navbar2 />
            {successMessage && !reclamationSent && (
                <div className="fixed left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white rounded-full p-4">
                    {successMessage}
                </div>
            )}
            {reclamationMessage && (
                <div className="fixed left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full p-4">
                    Réclamation envoyée
                </div>
            )}
            <div className='lg:mt-[20px] mt-2'>
                {client && (
                    <div>
                        <div className='ml-10 lg:ml-[220px] flex flex-row'>
                            {client.photo && (
                                <div className=''>
                                    <img className='md:w-[150px] w-[70px] rounded-full border-[#00000031] border-2' src={urlFor(client.photo.asset._ref).width(200).url()} alt={client.name} />
                                </div>
                            )}
                            <h2 className='mt-[4%] ml-6 md:text-[25px] text-[20px] text-white'>{client.organisation}</h2>
                        </div>
                        <div className=''>
                            <p className='text-white w-[300px] text-[10px] sm:text-[15px] ml-10 lg:mt-[-4%] mt-2 sm:ml-[400px]'>{client.bio}</p>
                        </div>
                        <div className='flex flex-row justify-evenly sm:w-[400px] w-[230px] h-[100px] lg:ml-[700px] lg:mt-0 mt-6  ml-[90px] '>
                            <button onClick={handlePlanValider} className={`bg-green-600 w-[190px] text-white rounded-full  hover:bg-green-700 h-8 ${isPlanValidated ? 'pointer-events-none opacity-50' : ''}`}>
                                {isPlanValidated ? 'Plan Validé' : 'Valider le plan'}
                            </button>
                            <button
                                onClick={handleReclamation}
                                className={`bg-red-600 w-[170px] hover:bg-red-700 lg:ml-0 ml-5 text-white rounded-full h-8 ${reclamationSent ? 'pointer-events-none opacity-50' : ''}`}>
                                Réclamation
                            </button>
                        </div>
                        <div className='items-center flex flex-row justify-evenly lg:text-xl text-[#fff] '>
                            <button onClick={() => setViewMode('grid')}>
                                <FontAwesomeIcon icon={faTableCells} className='lg:mr-2 mr-1' />
                                Publications
                            </button>
                            <button onClick={() => setViewMode('plan')}>
                                <FontAwesomeIcon icon={faArrowDownShortWide} className='lg:mr-2 mr-1' />
                                Filtré par mois
                            </button>
                        </div>
                    </div>
                )}

                <div className='flex flex-row justify-evenly'>
                    <div className='flex'>
                        <div className='justify-center flex'>
                            {viewMode === 'grid' ? (
                                <div className='grid grid-cols-3 md:grid-cols-3 lg:gap-4 gap-1 mt-5 w-full sm:max-w-[890px]'>
                                    {client && client.posts && [...client.posts].reverse().map((post: any, postIndex: any) => (
                                        <div key={post._key}>
                                            {post.media && post.media.length > 0 && (
                                                <div className='items-center flex justify-evenly'>
                                                    <div onClick={() => handleMediaClick(postIndex, 0, post.caption, post.date)}>
                                                        <div className='lg:w-[300px] lg:h-[300px] w-[100px] h-[100px] cursor-pointer lg:mt-[-5%]'>
                                                            {post.media[0]._type === 'clientImage' && post.media[0]?.asset?._ref && (
                                                                <Image className='lg:w-[300px] lg:h-[300px] w-[100px] h-[100px]' src={urlFor(post.media[0].asset?._ref).url() || ''} alt={post.caption} width={600} height={200} />
                                                            )}
                                                            {post.media[0]._type === 'video' && (
                                                                <MuxPlayer className='lg:w-[300px] lg:h-[300px] w-[100px] h-[100px]' playbackId={post.media[0].video?.asset.playbackId} />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Plan slug={slug} />
                            )}
                        </div>
                    </div>
                </div>
                {selectedPostIndex !== null && selectedMediaIndex !== null && client.posts[selectedPostIndex] && (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[#000000e1] z-50">
                        <div className="relative p-4 rounded-3xl shadow-lg max-h-[90vh] max-w-[90vw] bg-[#0000009a] overflow-x-hidden overflow-y-auto">
                            <button onClick={closeModal} className="absolute top-2 right-2 text-white text-2xl font-bold">
                                &times;
                            </button>
                            <div className="p-4 flex flex-col justify-center text-black">
                                <div className="flex justify-center items-center">
                                    {client.posts[selectedPostIndex].media[selectedMediaIndex]._type === 'clientImage' && (
                                        <Image
                                            src={urlFor(client.posts[selectedPostIndex].media[selectedMediaIndex].asset._ref).url()}
                                            alt={client.posts[selectedPostIndex].caption}
                                            width={600}
                                            height={400}
                                            className="object-contain max-h-[80vh] max-w-[80vw]"
                                        />
                                    )}
                                    {client.posts[selectedPostIndex].media[selectedMediaIndex]._type === 'video' && (
                                        <MuxPlayer
                                            playbackId={client.posts[selectedPostIndex].media[selectedMediaIndex].video?.asset.playbackId}
                                            className="max-h-[80vh] max-w-[80vw]"
                                        />
                                    )}
                                </div>
                                <div className='flex flex-col justify-center items-center mt-4'>
                                    <div className='w-full bg-[#313131e7] p-4 text-white rounded-lg'>
                                        <p className="text-lg mb-2">Description: {selectedDesc}</p>
                                        <p className="text-sm">Date: {selectedDate}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between w-full mt-4">
                                    {client.posts[selectedPostIndex].media.length > 1 && (
                                        <>
                                            <button onClick={() => navigateMedia('prev')} className="absolute top-1/2 transform -translate-y-1/2 left-2 lg-mt-[-20px] text-white bg-black rounded-full p-2 shadow-md">
                                                &lt;
                                            </button>
                                            <button onClick={() => navigateMedia('next')} className="absolute top-1/2 transform -translate-y-1/2 right-2 text-white bg-black rounded-full p-2 shadow-md">
                                                &gt;
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {showForm && (
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#00000088] sm:w-[800px] sm:h-[400px] w-[400px] rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            <button onClick={() => setShowForm(false)} className="absolute top-2 right-2 text-white text-2xl font-bold">
                                &times;
                            </button>
                            <textarea
                                className="w-full rounded-md p-2 text-white bg-[#202020] mb-4 h-[300px]"
                                placeholder="Entrez votre réclamation..."
                                value={formData}
                                onChange={(e) => setFormData(e.target.value)}
                            />
                            <button type="submit" disabled={!formData.trim()} className="bg-red-600 text-white py-2 px-4 rounded-full">
                                Envoyée
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Feed;
