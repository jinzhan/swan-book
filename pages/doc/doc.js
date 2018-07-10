import markdown from '../../utils/marked';

// https://raw.githubusercontent.com/jinzhan/es6tutorial/gh-pages/SUMMARY.md

const getUrl = (url, path) => {
    const basePath =  url.split('/');
    const suffix = basePath[basePath.length - 1];
    // 得到实际url
    const base = url.replace(new RegExp(suffix + '$'), '');
    const protocal = base.split(':')[0];
    let pathUrl = base.split(':')[1].replace(/^\/\//, '').replace(/\/$/, '');
    const isSimplePath = /^(\.?\/|[^.])/.test(path);
    const dir = path.split('../');
    const backDirCount = dir.length - 1;
    if(isSimplePath) {
        path = path.replace(/^\.?\//, '');
    }else{
        path = dir.pop();
    }
    if(backDirCount > 0) {
        pathUrl = pathUrl.split('/').slice(0, backDirCount * -1).join('/');
    }
    return protocal + '://' + pathUrl + '/' + path;
};

Page({
    data: {
        content: ''
    },

    onLoad(option) {
        const url = getUrl(option.baseurl, option.url);
        swan.request({
            url,
            dataType: 'string',
            success: res => {
                const content = markdown(res.data);
                this.setData({
                    content
                });
                console.log({content});
            },
            fail: res => {
                swan.showModal({
                    content: JSON.stringify(res)
                });
            }
        });
    },

    onShow() {

    },

    render(e) {
        swan.showModal({
            content: JSON.stringify(e)
        })
    }
});