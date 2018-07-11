import markdown from '../../utils/marked';
import {html2json} from '../../utils/html2json';

const getLink = data => {
    const ret = [];
    data.forEach((item, index) => {
        if (item.tag === 'a') {
            ret.push(item);
            return item;
        }
        item.child && ret.push(getLink(item.child));
    });
    return ret;
};


const flatten = arr => arr.reduce((current, next, arr) =>
     current.concat(Array.isArray(next) ? flatten(next) : next), []);

Page({
    data: {
        content: '',
        baseUrl: '',
        catalog: []
    },

    onLoad(option) {
        const url = option.url;
        swan.setNavigationBarTitle({
            title: option.title
        });
        this.setData({
            baseUrl: encodeURIComponent(url)
        });
        swan.request({
            url,
            dataType: 'string',
            success: res => {
                const content = markdown(res.data);
                this.format(content);
                this.setData({
                    content: '<navigator url="../index/index">pages/index/index</navigator>'
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

    format(html) {
        const data = html2json(html);
        const catalog = flatten(getLink(data.child));
        this.setData({catalog})
    },

    render(e) {
        swan.showModal({
            content: JSON.stringify(e)
        })
    }
});