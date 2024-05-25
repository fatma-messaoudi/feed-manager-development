'use client'
import React, { useState, useEffect } from 'react';
import { Navbar2 } from '@/components';
import { createClient, ClientConfig } from '@sanity/client';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { Client } from '@/types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddOrganizationModal from '@/components/addorg/AddOrganizationModal';
import { OrganizationSwitcher, useClerk } from '@clerk/nextjs';

const clientConfig: ClientConfig = {
    projectId: 'u0y2jg1u',
    dataset: 'production',
    token: 'skaKTATGykfklSa9F4jYcRMtmWK4IhQO3046Tvc15Q9u9d4WwrmrJ9zTwoOlrM7IIOfyfIbf4FVzczWZJqEJGxvOlpkUb3YbxB6YyrfmrhK7Fq5TUJPD9Z1k4TRAL8Giv1tzPu9YJ8qlctbXT9brNaRhVXik4ddRUlD2RnxQPQhXGgXGYFQs',
    useCdn: false,
};
const sanityClient = createClient(clientConfig);
const builder = imageUrlBuilder(sanityClient);

function urlFor(source: any) {
    return builder.image(source);
}

const Page: React.FC = () => {
    const { createOrganization } = useClerk();
    const [clients, setClients] = useState<Client[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                setIsLoading(true);
                const clientsData: Client[] = await sanityClient.fetch(`
                    *[_type == "client" && name match $searchQuery] {
                        _id,
                        name,
                        photo
                    }
                `, { searchQuery: `*${searchQuery}*` });
                setClients(clientsData);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, [searchQuery]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleRemoveClient = async (clientId: string) => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette organisation ?");
        if (confirmed) {
            try {
                await sanityClient.delete(clientId);
                setClients(prevClients => prevClients.filter(client => client._id !== clientId));
            } catch (error) {
                console.error('Error removing client:', error);
            }
        }
    };

    const handleClientClick = () => {
        console.log('Client clicked');
    };

    const handleAddOrganization = async ({ name, organisation , }: { name: string, organisation: string }) => {
        try {
            const organization = await createOrganization({ name });

            await sanityClient.create({
                _type: 'client',
                name,
                organisation,
                
            });

            const clientsData: Client[] = await sanityClient.fetch(`
                *[_type == "client"] {
                    _id,
                    name,
                    photo
                }
            `);
            setClients(clientsData);
        } catch (error) {
            console.error('Error adding organization:', error);
        }
    };

    return (
        <div className='bg-[#000] overflow-x-hidden'>
            <Navbar2 />
            <div className=' bg-slate-300'> <OrganizationSwitcher/></div>
            

            <div className="flex flex-1 items-center mt-10 justify-center p-6">
                <div className="w-full sm:w-[80%] max-w-[500px] ml-4 sm:ml-10">
                    <form className="flex flex-row" onSubmit={e => e.preventDefault()}>
                        <input
                            id="q"
                            name="q"
                            className="inline w-[250px] lg:w-[500px] rounded-md text-white bg-[#1f1f1f] py-2 pl-3 pr-3 leading-5 placeholder-gray-300 focus:placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm"
                            placeholder="chercher (organization slug)"
                            type="search"
                            onChange={handleSearch}
                            value={searchQuery}
                        />
                        <button
                            type="submit"
                            className="inline-flex lg:w-[100px] w-[80px] ml-1 font-semibold items-center justify-center rounded-full border border-transparent bg-[#1d1d1d] py-2 text-white shadow-sm hover:bg-[#4d4d4dfb] focus:outline-none focus:ring-offset-2 sm:ml-3 sm:text-sm"
                        >
                            chercher
                        </button>
                    </form>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className='bg-[#1d1d1d] pl-4 ml-[-250px] font-semibold lg:mt-[-2px] mt-[120px] pr-4  rounded-full hover:bg-[#4d4d4dfb] lg:ml-4 lg:w-[240px] h-[40px] text-white'
                >
                    Ajouter une organisation
                </button>
            </div>
            <div className='justify-center flex'>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 items-center">
                    {isLoading ? (
                        <div className="text-white">Loading...</div>
                    ) : (
                        clients.map((client, index) => (
                            <div key={index} className="m-4 flex pb-5 lg:w-[500px] w-full p-2 items-center hover:bg-[#4d4d4dfb] text-center text-white bg-[#1f1f1f] rounded-full" onClick={handleClientClick}>
                                <Link href={`/admin/${client.name}`} className=' flex flex-row items-center mt-2'>
                                    {client.photo && (
                                        <Image className='rounded-full ' src={urlFor(client.photo).url()} alt={client.name} width={50} height={50}  />
                                    )}
                                    <span className='ml-2'>{client.name}</span>
                                </Link>
                                <Link href={`/studio/structure/client`} target="_blank" className='ml-auto bg-green-500 text-white p-2 w-[40px] rounded-full'>
                                    <FontAwesomeIcon className=' text-[12px]' icon={faPenToSquare} />
                                </Link>
                                <button
                                    onClick={() => handleRemoveClient(client._id)}
                                    className='ml-2 bg-red-500 text-white p-2 w-[40px] rounded-full'>
                                    <FontAwesomeIcon className=' text-[12px]' icon={faTrash} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <AddOrganizationModal 
                isOpen={isModalOpen} 
                onRequestClose={() => setIsModalOpen(false)} 
                onSubmit={handleAddOrganization} 
            />
        </div>
    );
};

export default Page;
