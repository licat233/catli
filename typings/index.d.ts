/// <reference path="./index.d.ts" />

interface ImageInfo {
    name: string;
    url: string;
    preview: string;
    tag: string;
    alt: string;
    width: number;
    height: number;
    catgoryId: number;
    isVideo: boolean;
    isDelete: boolean;
    deletedAt: string;
    createAt: string;
    updateAt: string;
}

interface BaseResponse {
    success: boolean;
    message: string;
    data: ImageInfo[];
}