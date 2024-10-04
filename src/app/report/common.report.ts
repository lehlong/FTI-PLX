export function SaveBlob(blob: any, fileName: any) {
    var a: any = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    blob.lastModifiedDate = new Date();
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
}

export function EBase64ToBlob(eB64Data: any, contentType: any) {
    var bString = window.atob(eB64Data);
    var bLength = bString.length;
    var bytes = new Uint8Array(bLength);
    for (var i = 0; i < bLength; i++) {
        var ascii = bString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return new Blob([bytes], { type: contentType });
}
export function Base64ToBlob(b64Data: any, contentType: any, sliceSize?: any) {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (
        var offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
    ) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}