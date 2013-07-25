
// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

!function ($) {

  $(function(){

    var $window = $(window)

    var story = "royalbaby";
    var sources = ["bbc"];

    // Disable certain links in docs
    $('section [href^=#]').click(function (e) {
      e.preventDefault()
    })

    // side bar
    setTimeout(function () {
      $('.bs-docs-sidenav').affix({
        offset: {
          top: -10
        , bottom: 270
        }
      })
    }, 100)

    // make code pretty
    window.prettyPrint && prettyPrint()

    // add-ons
    $('.add-on :checkbox').on('click', function () {
      var $this = $(this)
        , method = $this.attr('checked') ? 'addClass' : 'removeClass'
      $(this).parents('.add-on')[method]('active')
    })

    $('#topemailbutton').on('click', function() {
      $('#tldrsidebar ul').children().first().remove() ;
    })

    // add tipsies to grid for scaffolding
    if ($('#gridSystem').length) {
      $('#gridSystem').tooltip({
          selector: '.show-grid > [class*="span"]'
        , title: function () { return $(this).width() + 'px' }
      })
    }

    //Use .slider('getValue') to get the current conciseness index
    $('#conciseness').slider()
      .on('slide', function(ev){
        $('#concisenessid').html(ev.value + "%")
      })

    // tooltip demo
    $('.tooltip-demo').tooltip({
      selector: "a[data-toggle=tooltip]"
    })

    $('.tooltip-test').tooltip()
    $('.popover-test').popover()

    // popover demo
    $("a[data-toggle=popover]")
      .popover()
      .click(function(e) {
        e.preventDefault()
      })

    // button state demo
    $('#fat-btn')
      .click(function () {
        var btn = $(this)
        btn.button('loading')
        setTimeout(function () {
          btn.button('reset')
        }, 3000)
      })

    // carousel demo
    $('#myCarousel').carousel()

    // javascript build logic
    var inputsComponent = $("#components.download input")
      , inputsPlugin = $("#plugins.download input")
      , inputsVariables = $("#variables.download input")

    // toggle all plugin checkboxes
    $('#components.download .toggle-all').on('click', function (e) {
      e.preventDefault()
      inputsComponent.attr('checked', !inputsComponent.is(':checked'))
    })

    $('#plugins.download .toggle-all').on('click', function (e) {
      e.preventDefault()
      inputsPlugin.attr('checked', !inputsPlugin.is(':checked'))
    })

    $('#variables.download .toggle-all').on('click', function (e) {
      e.preventDefault()
      inputsVariables.val('')
    })

    $("#topemaildone").hide();

    $('#topemailbutton').on('click', function(e){
      $("#topemail").hide();
      $("#topemaildone").show();
      var useremail = $("#topemailinput").val();
      $.ajax({
        url: "/email",
        type: "GET",
        dataType: "json",
        data: {
          email: useremail
        }, 
        contentType: "application/json",
        cache: false,
        timeout: 5000,
        complete: function() {
        },

        success: function(data) {
       },

        error: function() {
          console.log('email error');
        },
      });
    });
    $("#botemaildone").hide();

    $('#botemailbutton').on('click', function(e){
      $("#botemail").hide();
      $("#botemaildone").show();
      var useremail = $("#botemailinput").val();
      $.ajax({
        url: "/email",
        type: "GET",
        dataType: "json",
        data: {
          email: useremail
        }, 
        contentType: "application/json",
        cache: false,
        timeout: 5000,
        complete: function() {
        },

        success: function(data) {
       },

        error: function() {
          console.log('email error');
        },
      });
    });

    $('#royalbaby').on('click', function(e){
      story = "royalbaby";
    });
    $('#trainexplosion').on('click', function(e){
      story = "trainexplosion";
    });
    $('#weiner').on('click', function(e){
      story = "weiner";
    });
    $('#chineseearthquake').on('click', function(e){
      story = "chineseearthquake";
    });

    $('#bbc').on('click', function(e){
      var sIndex = $.inArray("bbc", sources);
      if(sIndex >= 0) {
        sources.splice(sIndex, 1);
      }
      else{
        sources.push("bbc");
      }
      console.log(sources);
    });
    $('#cnn').on('click', function(e){
      var sIndex = $.inArray("cnn", sources);
      if(sIndex >= 0) {
        sources.splice(sIndex, 1);
      }
      else{
        sources.push("cnn");
      }
      console.log(sources);
    });
    $('#globeandmail').on('click', function(e){
      var sIndex = $.inArray("globeandmail", sources);
      if(sIndex >= 0) {
        sources.splice(sIndex, 1);
      }
      else{
        sources.push("globeandmail");
      }
      console.log(sources);
    });
    $('#nationalpost').on('click', function(e){
      var sIndex = $.inArray("nationalpost", sources);
      if(sIndex >= 0) {
        sources.splice(sIndex, 1);
      }
      else{
        sources.push("nationalpost");
      }
      console.log(sources);
    });

    $('#gogoajax').on('click', function(e){
      var cIndex = $('#conciseness').slider().data('slider').getValue()
      $.ajax({
        url: "/summary",
        type: "GET",
        dataType: "json",
        data: {
          // one of chineseearthquake, royalbaby, trainexplosion, weiner
          story: story,

          // list of bbc, cnn, globeandmail, nationalpost
          sources: sources,

          // value from 0 - 1. Suggested to be at like 0.05 ish
          conciseIndex: cIndex/(100.0 * sources.length)
        }, 
        contentType: "application/json",
        cache: false,
        timeout: 5000,
        complete: function() {
        },

        success: function(data) {
          $("#final").show();
          $("#title").html(data.title);
          $("#article").html(data.summary);
       },

        error: function() {
          console.log('ajax error');
        },
      });

    });



    // request built javascript
    $('.download-btn .btn').on('click', function () {

      var css = $("#components.download input:checked")
            .map(function () { return this.value })
            .toArray()
        , js = $("#plugins.download input:checked")
            .map(function () { return this.value })
            .toArray()
        , vars = {}
        , img = ['glyphicons-halflings.png', 'glyphicons-halflings-white.png']

    $("#variables.download input")
      .each(function () {
        $(this).val() && (vars[ $(this).prev().text() ] = $(this).val())
      })

      $.ajax({
        type: 'POST'
      , url: /\?dev/.test(window.location) ? 'http://localhost:3000' : 'http://bootstrap.herokuapp.com'
      , dataType: 'jsonpi'
      , params: {
          js: js
        , css: css
        , vars: vars
        , img: img
      }
      })
    })
  })

// Modified from the original jsonpi https://github.com/benvinegar/jquery-jsonpi
$.ajaxTransport('jsonpi', function(opts, originalOptions, jqXHR) {
  var url = opts.url;

  return {
    send: function(_, completeCallback) {
      var name = 'jQuery_iframe_' + jQuery.now()
        , iframe, form

      iframe = $('<iframe>')
        .attr('name', name)
        .appendTo('head')

      form = $('<form>')
        .attr('method', opts.type) // GET or POST
        .attr('action', url)
        .attr('target', name)

      $.each(opts.params, function(k, v) {

        $('<input>')
          .attr('type', 'hidden')
          .attr('name', k)
          .attr('value', typeof v == 'string' ? v : JSON.stringify(v))
          .appendTo(form)
      })

      form.appendTo('body').submit()
    }
  }
})

}(window.jQuery)