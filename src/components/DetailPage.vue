<template>
  <v-container class="ma-auto mt-10">
    <v-row align="center" justify="center">
      <v-card elevation="2" width="80em">
        <v-container fluid class="ma-auto fill-height pa-2">
          <v-row dense>
            <v-card-title class="ma-auto text-h5" v-text="game.jpTitle"></v-card-title>
          </v-row>
          <v-row>
            <v-col>
              <v-sheet elevation="3">
                <v-img :src="game.posterLink" aspect-ratio="1.2" contain></v-img>
              </v-sheet>
            </v-col>
            <v-col>
              <v-sheet min-width="30em" class="pa-2">
                <v-simple-table>
                  <tbody>
                  <tr>
                    <td class="text-left font-weight-bold">日文标题</td>
                    <td class="text-right" v-text="game.jpTitle"></td>
                  </tr>
                  <tr>
                    <td class="text-left font-weight-bold">中文标题</td>
                    <td class="text-right" v-text="game.cnTitle"></td>
                  </tr>
                  <tr>
                    <td class="text-left font-weight-bold">游戏类型</td>
                    <td class="text-right">{{ game.gameType }}</td>
                  </tr>
                  <tr>
                    <td class="text-left font-weight-bold">标签</td>
                    <td class="text-right">
                      <v-chip-group column class="float-right">
                        <v-chip v-for="tag in game.tags" :key="tag"
                        >{{ tag }}
                        </v-chip>
                      </v-chip-group>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left font-weight-bold">评分</td>
                    <td class="text-right">
                      <v-rating :value="game.rating">

                      </v-rating>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left font-weight-bold">汉化状态</td>
                    <td class="text-right">
                      <div v-if="game.localizationStatus === 'OFFICIAL_TRANSLATION'">
                        <v-icon color="success" class="pr-1">mdi-check-bold</v-icon>
                        官方汉化
                      </div>

                    </td>
                  </tr>
                  <tr>
                    <td class="text-left font-weight-bold">汉化者</td>
                    <td class="text-right" v-text="game.localizationOrganization"></td>
                  </tr>
                  <tr>
                    <td colspan="3" class="pa-1">
                      <v-expansion-panels accordion class="pa-0">
                        <v-expansion-panel>
                          <v-expansion-panel-header class="font-weight-bold">购买链接</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-list>
                              <v-list-item @click="open_dlsite_link">
                                <v-list-item-icon>
                                  <v-icon color="blue">mdi-open-in-new</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>DlSite</v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3" class="pa-1">
                      <v-expansion-panels accordion class="pa-0">
                        <v-expansion-panel>
                          <v-expansion-panel-header class="font-weight-bold">引用链接</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-list>
                              <v-list-item @click="open_dlsite_link" v-for="(value,key) in game.referLinks" :key="key">
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
                    <td v-if="game.infoLastUpdate != null" v-text="game.infoLastUpdate" class="text-right"></td>
                    <td v-else v-text="'暂无数据'" class="text-right"></td>
                  </tr>
                  </tbody>
                </v-simple-table>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>

  </v-container>
</template>

<script>
import Api from "@/services/Api";

export default {
  name: "DetailPage",
  data() {
    return {
      gameId: this.$route.params.id,
      game: null
    }
  },
  methods: {
    open_dlsite_link: function () {
      window.open("https://www.dlsite.com/maniax/work/=/product_id/" + this.game.dlsiteId + ".html")
    },
    fetchData: function () {
      Api.getGameInfo(this.gameId).then(response => {
        this.game = response.data.msg
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
