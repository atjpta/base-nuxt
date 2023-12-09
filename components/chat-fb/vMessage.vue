<template>
    <div>
        <div id="fb-root"></div>

        <!-- Your Plugin chat code -->
        <div page_id="185211874671034" attribution="biz_inbox" class="fb-customerchat">
        </div>
    </div>
</template>

<script setup>


window.fbAsyncInit = function () {
    FB.init({
        xfbml: true,
        version: 'v18.0'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


</script>

<style></style>


