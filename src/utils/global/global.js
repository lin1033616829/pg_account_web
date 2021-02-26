export const globalConf = {
    game:{
        notifyYes:2,
        notifyNo: 1,

        statusOn: 2,
        statusOff:1,
        statusDel: 3,

        statusMap:{
            1:    "下线",
            2:    "上线",
            3:    "已删除"
        },
    },
    game_match:{
        notifyYes:2,
        notifyNo: 1,

        statusOn: 2,
        statusOff:1,
        statusDel:3,

        team_type_1: 1,
        team_type_2: 2,

        statusMap:{
            1:    "下线",
            2:    "上线",
            3:    "已删除"
        },

        teamTypeMap:{
            1: "对称团队战",
            2: "各自为战",
        },
        teamTypeList:[
            {
                label: "对称团队战",
                value: 1,

            },
            {
                label: "各自为战",
                value: 2,
            }
        ],
    },
    goods:{
        saleStatusOff:1,
        saleStatusOn:2,

        saleStatusMap:{
            1:"下线",
            2:"上线",
        },

        notifyYes:2,
        notifyNo:1,
    },

};
