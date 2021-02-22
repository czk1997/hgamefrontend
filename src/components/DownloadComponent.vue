<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel elvation="1">
        <v-expansion-panel-header>
          <div>
            <v-icon left color="grey" class="pa-1">mdi-cloud</v-icon>
            各种云
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <YunDownLoadCard serviceProvider="百度云" link="https://baidu.com"/>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel elvation="1">
        <v-expansion-panel-header @click="requestDownloadLink">
          <div>
            <v-icon left color="grey" class="pa-1">mdi-download-box</v-icon>
            本地下载
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container fluid>
            <v-row v-if="loadingS3UnzipPassword" >
              <v-skeleton-loader type="list-item" width="100em"></v-skeleton-loader>
            </v-row>
            <v-row v-else-if="!loadingS3UnzipPassword && s3UnzipPassword ==null">
              <v-alert type="success" class="ma-auto mb-2 mt-2" width="100em">该文件没有解压密码哦！</v-alert>
            </v-row>
            <v-row v-else-if="!loadingS3UnzipPassword && s3UnzipPassword !=null">
              <v-col cols="2">
                <v-subheader>解压密码</v-subheader>
              </v-col>
              <v-col cols="6">
                <v-text-field v-text="s3UnzipPassword"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-divider></v-divider>
          <v-simple-table>
            <thead>
            <tr>
              <td class="text-left">文件名</td>
              <td class="text-right">下载</td>
            </tr>
            </thead>
            <tbody>
            <tr v-if="loading_local_links">
              <v-skeleton-loader type="list-item"></v-skeleton-loader>
            </tr>
            <tr v-else-if="!loading_local_links" v-for="(value, key) in localLinks" :key="key">
              <td class="text-left">{{ key }}</td>
              <td class="text-right">
                <v-btn cla @click="open_refer_link(value)">下载</v-btn>
              </td>
            </tr>
            </tbody>
          </v-simple-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>

</template>

<script>
import Api from "@/services/Api";
import YunDownLoadCard from "@/components/YunDownLoadCard";

export default {
  components: {YunDownLoadCard},
  props: ['gameId'],
  name: "DownloadComponent",
  data() {
    return {
      loadingS3UnzipPassword: true,
      s3UnzipPassword: null,
      loading_local_links: true,
      loading: false,
      yunLinks: null,
      localLinks: null
    }
  },
  methods: {
    open_refer_link: function (link) {
      window.open(link)
    },
    getYunDownloadMethod: function () {
      Api.getYunDownloadInfo(this.gameId).then(response => {
        this.yunLinks = response.data.msg
      }).catch(error => {

      })
    },
    requestDownloadLink: function () {
      console.log("opened")
      Api.requestDownloadLink(this.gameId).then(response => {
            this.localLinks = response.data.msg
            this.loading_local_links = false;
          }
      )
      Api.requestS3UnzipPassword(this.gameId).then(response => {
        this.s3UnzipPassword = response.data.msg
        this.loadingS3UnzipPassword = false;
      })
    }
  }
}
</script>

<style scoped>

</style>
