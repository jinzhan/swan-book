import markdown from '../../utils/marked';

/**
 * 获取内容的实际路径
 *
 * @param {string} url 当前的url，如: https://www.baidu.com/xxx/yyy/zzz
 * @param {string} path 拼接路径，如: ../demo
 * @return {string} 完整的路径，https://www.baidu.com/xxx/demo
 * **/
const patchUrl = (url, path) => {
    const baseSuffix = url.split('/').pop();
    const baseProtocal = url.split(':')[0] + '://';
    const base = url.replace(new RegExp('/' + baseSuffix + '$'), '').split('://')[1].split('/');
    if(/^\//.test(path)) {
        return baseProtocal + base.shift() + path;
    }
    // 清除掉 ./ 无效字符
    path = path.replace(/^\.\//, '');
    const ps = path.split('../');
    const dirCount = ps.length - 1;
    const pathSuffix = ps.pop();
    base.splice(base.length - dirCount, dirCount);
    return baseProtocal + base.join('/') + '/' + pathSuffix;
};

Page({
    data: {
        content: ''
    },

    onLoad(option) {
        const url = patchUrl(option.baseurl, option.url);
        swan.setNavigationBarTitle({
            title: option.title
        });
        swan.request({
            url,
            dataType: 'string',
            success: res => {
                const content = markdown(res.data);
                this.setData({
                    content
                });
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
        // bindtab
    }
});