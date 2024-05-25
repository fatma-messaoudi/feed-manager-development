
import { TemplateParams } from '@/types';
import imageUrlBuilder from '@sanity/image-url';
import emailjs from 'emailjs-com';
import { ClientConfig, createClient } from "next-sanity";

 // Sanity API Connexion Setup
 const clientConfig: ClientConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
};
export const sanityClient = createClient(clientConfig);

//Image Builder
export const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
    return builder.image(source);
}

export const fetchClientData = async (slug: string, setClient: any ) => {
    try {
        if (!slug) {
            throw new Error('Organization ID not found for the logged-in client');
        }
        sanityClient.fetch(`
        *[ _type == "client" && name == $slug ][0]{
            ...,
            photo,
            posts[] {       
                _key,   
                media[] {
                  ..., 
                  video { 
                    asset-> {
                    playbackId,     
                    assetId,              
                    filename,
                    }
                    }
                },
                caption, 
                date,
            }
        }
        `, { slug }).then((data) => setClient(data) );

    } catch (error) {
        console.error('Error fetching client data:', error);
    }
};





// Email JS plan validation 

emailjs.init('T69n7PC9OLbD-mHRz');

export const sendEmail = (
    templateParams: TemplateParams,
    setSuccessMessage: (message: string | null) => void,
    templateId: string
) => {
    emailjs
        .send("service_kdromkm", templateId, templateParams)
        .then((response) => {
            console.log("Email sent successfully:", response);
            if (templateId === "template_mytzb3f") {
                setSuccessMessage("Plan validé !");
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 5000);
            }
        })
        .catch((error) => {
            console.error("Error sending email:", error);
        });
};

