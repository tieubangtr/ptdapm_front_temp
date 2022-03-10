<template>
    <div id="page-forms">
        <v-container grid-list-xl fluid>
            <v-layout row wrap>
                <v-flex lg6>
                    <v-card class="mb-4">
                        <v-toolbar color="teal" dark flat dense cad>
                        <v-toolbar-title class="subheading">Hồ sơ tài khoản</v-toolbar-title>
                        <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-card-text class="">
                            <v-form v-model="valid">
                                <v-text-field
                                    label="Họ và tên"
                                    name="fullname"
                                    v-validate="'required'"
                                    data-vv-name="fullname"     
                                    :error-messages="errors.collect('fullname')"  
                                    required
                                ></v-text-field>    
                                <v-text-field
                                    label="Email"
                                    name="email"
                                    v-validate="'required|email'"
                                    data-vv-name="email"     
                                    :error-messages="errors.collect('email')"        
                                    required
                                ></v-text-field>    
                                <v-text-field
                                    label="Số điện thoại"
                                    v-validate="'required'"
                                    data-vv-name="phone"     
                                    :error-messages="errors.collect('phone')"                
                                    mask="phone"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    label="Ngày sinh"
                                    v-validate="'required'"
                                    data-vv-name="birthday"     
                                    :error-messages="errors.collect('phone')"                
                                    mask="phone"
                                    required
                                ></v-text-field>    
                                <v-text-field
                                    label="Địa chỉ"
                                    v-validate="'required'"
                                    data-vv-name="address"     
                                    :error-messages="errors.collect('phone')"                
                                    mask="phone"
                                    required
                                ></v-text-field>        
                                <div class="form-btn">
                                    <v-btn outline @click="submit" color="primary">Lưu thay đổi</v-btn>
                                </div>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex lg6>
                    <v-img src="https://scontent.fhan5-8.fna.fbcdn.net/v/t1.6435-9/61441232_2111788605600677_2041255779486400512_n.png?_nc_cat=107&ccb=1-5&_nc_sid=cdbe9c&_nc_ohc=cB5veHEfx3IAX9FW8Wg&_nc_ht=scontent.fhan5-8.fna&oh=00_AT8B2uYKd_WitqDCRDAWF8Ow_1hMWgnxTIZFJ92pyHq-uA&oe=62501A79" height="390">
                        <v-layout column class="media ma-0">
                            <v-card-title>
                            <v-btn dark icon>
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn dark icon class="mr-3">
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn dark icon>
                                <v-icon>more_vert</v-icon>
                            </v-btn>
                            </v-card-title>
                            <v-spacer></v-spacer>
                            <v-card-title class="white--text pl-5 pt-5">
                            <div class="display-1 pl-5 pt-5">Ali Conners</div>
                            </v-card-title>
                        </v-layout>
                    </v-img>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
  layout: 'dashboard',
};
</script>
