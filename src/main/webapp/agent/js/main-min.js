function closeIFrame(){const t=$(".bgBlack");$(t).addClass("target")}function show_alert(){$((function(){$("#show-function-alert").on("click",(function(){$(".function-alert").addClass("show"),setTimeout((function(){$(".function-alert").removeClass("show")}),3e3)}))}))}$("[data-btn]").on("click",(function(){const t=$(".bgBlack"),n=$(this).attr("data-btn");$(t).removeClass("target"),$("[data-id]").hide(),$('[data-id="'+n+'"]').fadeIn(0)})),$(".bgBlack").on("click",(function(){closeIFrame()}));