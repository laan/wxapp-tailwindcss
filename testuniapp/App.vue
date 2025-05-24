<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* #ifdef MP-WEIXIN */
	@import url('/styles/tailwind.wxapp.css');
	/* #endif */
	/* #ifndef MP-WEIXIN */
	@import url('/styles/tailwind.output.css');
	/* #endif */
</style>
