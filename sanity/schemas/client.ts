// client.js

interface MediaItem {
  _type: string;
}

interface Selection {
  media: MediaItem[];
  caption: string;
  date: string;
}

export default {
  name: 'client',
  title: 'Organisations',
  type: 'document',
  fields: [
    {
      name: 'photo',
      title: 'Photo de profil',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'name',
      title: 'Slug (nom de lorganisation avec "-")',
      type: 'string',
    },
    {
      name: 'organisation',
      title: 'Nom de lorganisation',
      type: 'string',
    },
    {
      title: 'Bio',
      name: 'bio',
      type: 'text'
    },
    {
      name: 'posts',
      title: 'Publications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'media',
              title: 'Media',
              type: 'array',
              of: [
                { type: 'clientImage', title: 'Image' },
                { type: 'video', title: 'Video' }
              ]
            },
            {
              name: 'caption',
              title: 'Description',
              type: 'string'
            },
            {
              name: 'date',
              title: 'Date',
              type: 'datetime',
              options: {
                dateFormat: 'DD-MM-YYYY ',
                timeFormat: 'HH:mm',
              }
            }
          ],
          preview: {
            select: {
              media: 'media',
              caption: 'caption',
              date: 'date'
            },
            prepare(selection: Selection) {
              const { media, caption, date } = selection;


              const firstMedia = media.find((item: MediaItem) => item._type === 'clientImage' || item._type === 'video');

              return {
                title: caption || 'Untitled',
                subtitle: date ? new Date(date).toLocaleDateString() : 'No date',
                media: firstMedia
              };
            }
          }
        }
      ]
    }
  ]
};
