import {config} from '../../utils/config';

Page({
    data: {
        docList: []
    },

    onLoad() {
        const _ = new Date / 1000 / 60 / 60 | 1;
        swan.request({
            url: config,
            dataType: 'json',
            data: {_},
            success: res => {
                res.data.forEach((item, index) => {
                   item.title = item.title;
                   item.url = encodeURIComponent(item.url);
                });
                this.setData({
                    docList: res.data
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

    }
});