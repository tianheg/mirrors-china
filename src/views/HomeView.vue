<script setup>
import { reactive, ref, onMounted } from 'vue'
import { message, InputSearch as aInputSearch, Spin as aSpin, List as aList, ListItem as aListItem,ListItemMeta as aListItemMeta, Popover as aPopover, Tag as aTag } from 'ant-design-vue'
import axios from 'axios'

let monitorData = reactive([])
let providerData = reactive([])
let softwareList = reactive([])
let softwareData = reactive({})
let search_text = ref('')
const spinning = ref(true)

const pagination = reactive({
  pageSize: 20,
  responsive: true,
  showSizeChanger: false,
  size: 'small',
  onChange: (page) => {
    document.querySelector('#app')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
})

const onSearch = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    _getData()
  } else {
    _getData(value)
  }
}

const _getData = (search = '') => {
  spinning.value = true
  axios
    .get('static/data.json')
    .then((res) => {
      monitorData = res.data
      providerData = {}
      softwareData = {}
      monitorData.forEach((e) => {
        let name = e.name
        let color = e.tag_color
        let url = e.url

        providerData[name] = { tag_color: color, url: url }

        for (let i = 0; i < e['item'].length; i++) {
          e['item'][i] = e['item'][i].toLowerCase()
          let softwareName = e['item'][i]
          if (!Object.prototype.hasOwnProperty.call(softwareData, softwareName)) {
            softwareData[softwareName] = []
          }
          softwareData[softwareName].push(name)
        }
      })
      softwareList = Object.keys(softwareData)

      if (search !== '') {
        search = search.trim()
        let resultList = []
        softwareList.forEach((e) => {
          if (e.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            resultList.push(e)
          }
        })
        monitorData.forEach((e) => {
          if (e['name'].toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            resultList = resultList.concat(e['item'])
          }
        })

        softwareList = Array.from(new Set(resultList))
      }
      spinning.value = false
    })
    .catch(() => {
      message.error('获取数据失败！')
    })
}

onMounted(() => {
  _getData()
})
</script>

<template>
  <main>
    <div class="search">
      <a-input-search
        v-model="search_text"
        placeholder="输入软件名称或提供方"
        enter-button="搜索..."
        @search="onSearch"
        allow-clear
      />
    </div>
    <div class="content">
      <a-spin :spinning="spinning">
        <a-list item-layout="horizontal" :pagination="pagination" :data-source="softwareList">
          <template #header>
            <a-popover title="提供方列表" placement="rightTop">
              <template #content>
                <a-list
                  :grid="{ gutter: 16, column: 2 }"
                  :data-source="Object.keys(providerData)"
                  style="width: 240px"
                >
                  <template #renderItem="{ item }">
                    <a-list-item>
                      <a target="_blank" :href="providerData[item]['url']">{{ item }} </a>
                    </a-list-item></template
                  >
                </a-list>
              </template>

              <b>提供方：{{ Object.keys(providerData).length }} </b>
            </a-popover>
            <b> 软件数目：{{ softwareList.length }}</b>
            <div class="header-switch"></div>
          </template>

          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta>
                <template #title>
                  <div class="list-title">{{ item }}</div>
                </template>
                <template #description>
                  <template v-for="tag in softwareData[item]" :key="`${Math.random()}-${tag}`">
                    <a-tag :color="providerData[tag]['tag_color']" style="margin: 0 2px 2px">
                      <a target="_blank" :href="providerData[tag]['url']">{{ tag }} </a>
                    </a-tag>
                  </template>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </a-spin>
    </div>
  </main>
</template>

<style lang="scss" scoped>
$min-width: 1000px;

.list-title {
  font-size: 16px;
  font-weight: bolder;
}

.search {
  margin: 0 auto;
  text-align: center;
  padding: 20px 10px;

  @media (min-width: $min-width) {
    width: 600px;
  }
}

.content {
  width: 100%;
  padding: 0px 80px 20px 80px;
  @media (max-width: $min-width) {
    padding: 0 20px 20px 20px;
  }
}

.header-switch {
  float: right;
}
</style>
