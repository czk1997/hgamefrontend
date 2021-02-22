<template>
  <v-card>
    <v-card-title class="ma-2">{{ this.serviceProvider }}</v-card-title>
    <v-card-text>
      <v-simple-table>
        <tbody>
        <tr v-if="unzipPassword!=null">
          <td>
            解压密码：
          </td>
          <td>
            {{ unzipPassword }}
          </td>
        </tr>
        <tr>

        </tr>
        </tbody>
      </v-simple-table>
      <v-btn class="ma-2">复制提取码并前往</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['serviceProvider', 'extractPassword', 'unzipPassword', 'link'],
  name: "YunDownLoadCard",
  methods:{
    copyLinkAndGo:function(){

    }
  }
}
</script>

<style scoped>

</style>
