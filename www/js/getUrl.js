var getUrl = url => {
    let path = window.location.pathname;
    let phoneGapPath = path.substring(0, path.lastIndexOf('/') + 1);

    if(device.platform === "Android")
        url = "file://" + phoneGapPath + url;
    else
        url = "../" + url;

    return url;
}