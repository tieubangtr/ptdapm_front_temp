<template>
    <v-container>
        <v-tabs>
            <v-tabs-slider color="gray"></v-tabs-slider>
            <v-tab href="#tab-1" style="margin-right:10%">
                Sách đã mượn
            </v-tab>
            <v-tab href="#tab-2" style="margin-right:10%">
                Sách quá hạn
            </v-tab>
            <v-tab href="#tab-3">
                Sách còn lại trong kho
            </v-tab>
            <v-tab-item value="tab-1">
                <StatisticalBorrowed/>
            </v-tab-item>
            <v-tab-item value="tab-2">
                <StatisticalExpired/>
            </v-tab-item>
            <v-tab-item value="tab-3">
                <StatisticalStore/>
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>
<script>
import StatisticalBorrowed from '../components/statistical/StatisticalBorrowed.vue'
import StatisticalExpired from '../components/statistical/StatisticalExpired.vue'
import StatisticalStore from '../components/statistical/StatisticalStore.vue'
export default {
    layout: 'dashboard',
    components: {
        StatisticalBorrowed,
        StatisticalExpired,
        StatisticalStore
    }
}
</script>