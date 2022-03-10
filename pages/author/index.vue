<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Danh sách tác giả</h3>
        </v-flex>
        <v-flex lg12>
          <v-card>
            <v-toolbar card color="white">
              <v-text-field
                flat
                solo
                prepend-icon="search"
                placeholder="Tìm kiếm"
                v-model="search"
                hide-details
                class="hidden-sm-and-down"
              ></v-text-field>
              <v-btn icon>
                <v-icon>filter_list</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="complex.headers"
                :search="search"
                :items="complex.items"
                class="elevation-1"
                item-key="name"
              >
                <template slot="items" slot-scope="props">
                  <td>
                    {{ props.item.id }}
                  </td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.createdAt }}</td>
                  <td>
                    <v-btn depressed outline icon fab dark color="blue" small>
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn depressed outline icon fab dark color="orange darken-3" small>
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn depressed outline icon fab dark color="pink" small>
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import {Items as Users} from '@/api/user';
  export default {
    layout: 'dashboard',
    data() {
      return {
        search: '',
        complex: {
          selected: [],
          headers: [
            {
              text: '#',
              value: 'id'
            },
            {
              text: 'Tên tác giả',
              value: 'name'
            },
            {
              text: 'Ngày thêm mới',
              value: 'createdAt'
            },
            {
              text: 'Chức năng',
              value: ''
            },
          ],
          items: Users
        },
      };
    },
    methods: {
      getDetail(userId){
        axios.get("")
      }
    }
  };
</script>
