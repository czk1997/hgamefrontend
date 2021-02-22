<template>
  <v-container class="ma-auto mt-10">

    <v-row align="center" justify="center">
      <v-card elevation="2" width="80em">
        <v-container fluid class="ma-auto fill-height pa-2">
          <v-row dense>
            <v-skeleton-loader v-if="loading" type="heading" min-width="30em" class="ma-auto pa-5"></v-skeleton-loader>
            <v-card-title v-if="!loading" class="ma-auto text-h5" v-text="game.jpTitle"></v-card-title>
          </v-row>
          <v-row>
            <v-col>
              <v-sheet elevation="3">
                <v-skeleton-loader v-if="loading" type="image"
                                   class="ma-2 align-center justify-center"></v-skeleton-loader>
                <v-img v-else-if="!loading" :src="game.posterLink" class="ma-1" aspect-ratio="1.2" contain></v-img>
              </v-sheet>
            </v-col>
            <v-col>
              <v-sheet min-width="30em" class="pa-2">

                <v-simple-table>
                  <tbody>
                  <tr>
                    <td class="text-left font-weight-bold">日文标题</td>
                    <td v-if="loading">
                      <v-skeleton-loader type="list-item" class="mx-auto"
                                         max-width="30em"></v-skeleton-loader>
                    </td>
                    <td v-if="!loading" class="text-right" v-text="game.jpTitle"></td>
                  </tr>
                  <tr>
                    <td class="text-left font-weight-bold">中文标题</td>
                    <td v-if="loading">
                      <v-skeleton-loader type="list-item" class="mx-auto"
                                         max-width="30em"></v-skeleton-loader>
                    </td>
                    <td v-if="!loading" class="text-right" v-text="game.cnTitle"></td>
                  </tr>
                  <tr>
                    <td class="text-left font-weight-bold">官方网站</td>
                    <td v-if="loading">
                      <v-skeleton-loader type="button" class="mx-auto"
                                         max-width="4em"></v-skeleton-loader>
                    </td>
                    <td v-else-if="game.officialWebSite !=null && !loading" class="text-right"
                        @click="open_refer_link(game.officialWebsite)">
                      <v-btn>前往</v-btn>
                    </td>
                    <td v-else class="text-right">
                      暂无
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left font-weight-bold">游戏类型</td>
                    <td v-if="loading">
                      <v-skeleton-loader type="list-item" class="mx-auto"
                                         max-width="30em"></v-skeleton-loader>
                    </td>
                    <td v-if="!loading" class="text-right">{{ game.gameType }}</td>
                  </tr>
                  <tr>
                    <td class="text-left font-weight-bold">标签</td>
                    <td v-if="loading">
                      <v-skeleton-loader type="list-item" class="mx-auto"
                                         max-width="30em"></v-skeleton-loader>
                    </td>
                    <td v-if="!loading" class="text-right">
                      <v-chip-group column class="float-right">
                        <v-chip v-for="tag in game.tags" :key="tag"
                        >{{ tag }}
                        </v-chip>
                      </v-chip-group>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left font-weight-bold">评分</td>
                    <td v-if="loading">
                      <v-skeleton-loader type="list-item" class="mx-auto"
                                         max-width="30em"></v-skeleton-loader>
                    </td>
                    <td v-if="!loading" class="text-right">
                      <v-rating hover half-increments :value="game.rating">
                      </v-rating>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left font-weight-bold">汉化状态</td>
                    <td v-if="loading">
                      <v-skeleton-loader type="list-item" class="mx-auto"
                                         max-width="30em"></v-skeleton-loader>
                    </td>
                    <td v-if="!loading" class="text-right">
                      <div v-if="game.localizationStatus === 'OFFICIAL_TRANSLATION'">
                        <v-icon color="success" class="pr-1">mdi-check-bold</v-icon>
                        官方汉化
                      </div>
                      <div v-else-if="game.localizationStatus ==='NOT_TRANSLATED'">
                        <v-icon color="error" class="pr-1">mdi-alert-circle</v-icon>
                        未汉化
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left font-weight-bold">汉化者</td>
                    <td v-if="loading">
                      <v-skeleton-loader type="list-item" class="mx-auto"
                                         max-width="30em"></v-skeleton-loader>
                    </td>
                    <td v-if="!loading" class="text-right" v-text="game.localizationOrganization"></td>
                  </tr>
                  <tr v-if="!loading && (game.dlsiteId !=null || game.getchuId !=null)">
                    <td colspan="3" v-if="loading">
                      <v-skeleton-loader type="list-item" class="mx-auto"
                                         max-width="60em"></v-skeleton-loader>
                    </td>
                    <td v-if="!loading" colspan="3" class="pa-1">
                      <v-expansion-panels accordion class="pa-0">
                        <v-expansion-panel>
                          <v-expansion-panel-header class="font-weight-bold">购买链接</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-list>
                              <v-list-item @click="open_dlsite_link" v-if="game.dlsiteId !=null">
                                <v-list-item-icon>
                                  <v-icon color="blue">mdi-open-in-new</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>DlSite</v-list-item-title>
                              </v-list-item>
                              <v-list-item
                                  @click="open_refer_link('http://www.getchu.com/soft.phtml?id='+game.getchuId)"
                                  v-if="game.getchuId !=null">
                                <v-list-item-icon>
                                  <v-icon color="blue">mdi-open-in-new</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>GetChu</v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3" v-if="loading">
                      <v-skeleton-loader type="list-item" class="mx-auto"
                                         max-width="60em"></v-skeleton-loader>
                    </td>
                    <td v-if="!loading" colspan="3" class="pa-1">
                      <v-expansion-panels accordion class="pa-0">
                        <v-expansion-panel>
                          <v-expansion-panel-header class="font-weight-bold">引用链接</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-list>
                              <v-list-item v-for="(value,key) in game.referLinks" :key="key"
                                           @click="open_refer_link(value)">
                                <v-list-item-icon>
                                  <v-icon v-if="key === 'Steam'">mdi-steam</v-icon>
                                  <v-icon v-else>mdi-open-in-new</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>{{ key }}</v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left font-weight-bold">
                      信息最后更新日期
                    </td>
                    <td v-if="loading">
                      <v-skeleton-loader type="list-item" class="mx-auto"
                                         max-width="30em"></v-skeleton-loader>
                    </td>
                    <td v-else-if="!loading && game.infoLastUpdate != null" class="text-right">
                      {{ game.infoLastUpdate|moment("YYYY年MM月DD日 hh:mm") }}
                    </td>
                    <td v-else v-text="'暂无数据'" class="text-right"></td>
                  </tr>
                  </tbody>
                </v-simple-table>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
        <v-divider/>
        <v-tabs class="pa-2">
          <v-tab>简介</v-tab>
          <v-tab-item>
            <v-card class="pa-3">
              <v-skeleton-loader v-if="loading" type="paragraph" width="100em"></v-skeleton-loader>
              <v-card-text v-if="!loading" v-text="game.description" class="text-pre-wrap">
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab v-if="! loading && game.detail != null">详情</v-tab>
          <v-tab>下载</v-tab>
          <v-tab-item>
            <DownloadComponent :game-id="gameId"/>
          </v-tab-item>
          <v-tab>评论</v-tab>
        </v-tabs>
      </v-card>
    </v-row>

  </v-container>
</template>

<script>
import Api from "@/services/Api";
import DownloadComponent from "@/components/DownloadComponent";

export default {
  name: "DetailPage",
  components: {DownloadComponent},
  data() {
    return {
      loading: true,
      gameId: this.$route.params.id,
      game: null
    }
  },
  methods: {
    open_refer_link: function (link) {
      window.open(link)
    },
    open_dlsite_link: function () {
      window.open("https://www.dlsite.com/maniax/work/=/product_id/" + this.game.dlsiteId + ".html")
    },
    fetchData: function () {
      Api.getGameInfo(this.gameId).then(response => {
        this.game = response.data.msg
        this.loading = false
      }).catch()

    }

  },
  mounted() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  }
}
</script>

<style scoped>
html {
  overflow-y: scroll;
}
</style>
