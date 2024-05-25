//Interface Definition
export interface Client {
    bio: string;
    organisation: string;
    _id: string;
    name: string;
    photo: {
        asset: {
            _ref: string;
        }
    };
    posts: Post[]
}

export interface Post {
    _key: string;
    _type: string;
    media?: Media[];
    caption: string;
    date: string;
}

export interface Media {
    _type: string;
    video: {
        asset: {
            playbackId: string
        }
    },
    asset: {
        _ref: string;

        _type: 'clientImage' | 'video';
    };
}
export interface TemplateParams {
    to_email: string;
    from_name: string;
    message: string;
    [key: string]: any;
}
