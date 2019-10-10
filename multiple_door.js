$(function () {

    var borderColor = 'rgb(255, 133, 98)';
    var $glass = $(); // jQuery объект с селекторами стёкол
    var $doorColor = $(); // jQuery объект с селекторами цвета
    var $doorInnerColor = $(); // jQuery объект с селекторами внутреннего цвета
    var $doorOuterColor = $(); // jQuery объект с селекторами внешнего цвета
    var $priceField = findPriceField('#totalPrice'); // ссылка на jQuery селектор куда вставлять цену.
    var github_url = 'https://olehmusihin.github.io/door_work/'; // путь к папке где хранятся все изображения;
    var door = ''; // название папки с дверью, берётся с картинки со страницы с #door=название, должно совпадать с названием папки где хранятся фотографии двери.
    var doorImg = ''; // селектор изображения двери.
    var color = '1'; // какой цвет двери будем искать;
    var glass = '1';  // какое стекло будем фильтровать;
    var doorInnerColor = '1'; // какой цвет внутренней двери будем искать
    var doorOuterColor = '1'; // какой цвет внешней двери будем искать
    var costInner = 1;
    var costOuter = 1;

    // Add event listeners to a elements;
    $('a').filter(function (i, d) {
        if (d.href.indexOf('#glass') != -1) {
            $glass = $glass.add(d);
            return true;
        }
        if (d.href.indexOf('#doorColor') != -1) {
            $doorColor = $doorColor.add(d);
            return true;
        }
        if (d.href.indexOf('#doorInnerColor') != -1) {
            $doorInnerColor = $doorInnerColor.add(d);
            return true;
        }
        if (d.href.indexOf('#doorOuterColor') != -1) {
            $doorOuterColor = $doorOuterColor.add(d);
            return true;
        }
    })
        .on('click', function (e) {
            removeBorders(e);
            addBorder(e);
            findImageNumber(e);
            getDoorName(e);
            getDoorSelector(e);
            calculatePrice(e);
            addDoorImage(door, color, glass, doorInnerColor, doorOuterColor, e);
        });

    // Add Border
    function addBorder(e) {
        $(e.target).addClass('borderActive')
    }

    // Remove Border
    function removeBorders(e) {
        if (e.target.href.indexOf('#glass') != -1) {
            $glass.removeClass('borderActive');
        }
        if (e.target.href.indexOf('#doorColor') != -1) {
            $doorColor.removeClass('borderActive');
        }
        if (e.target.href.indexOf('#doorInnerColor') != -1) {
            $doorInnerColor.removeClass('borderActive');
        }
        if (e.target.href.indexOf('#doorOuterColor') != -1) {
            $doorOuterColor.removeClass('borderActive');
        }
    }

    // Find image number
    function findImageNumber(e) {
        if (e.target.href.indexOf('#glass') != -1) {
            glass = findColorNumber(e.target.href);
        }

        if (e.target.href.indexOf('#doorColor') != -1) {
            color = findColorNumber(e.target.href);
        }

        if (e.target.href.indexOf('#doorInnerColor') != -1) {
            doorInnerColor = findColorNumber(e.target.href);
            costInner = findCost(e.target.href);
            alert(costInner);
        }
        if (e.target.href.indexOf('#doorOuterColor') != -1) {
            doorOuterColor = findColorNumber(e.target.href);
            costOuter = findCost(e.target.href);
            alert(costOuter);
        }
    }

    // The regular expression for finding color num.
    function findColorNumber(linkHref) {
        var regex = /[^=]\d*$/gm;
        let str = linkHref;
        let m;
        var result;

        // for two doors with cost
        if (str.indexOf('&cost=') != -1) {
            str = str.replace(str.slice(str.indexOf('&cost=')), '');
        }

        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                result = match;
                return match;
            });
        }
        return result;
    }

    // The regular expression for finding price.
    function findCost(linkHref) {
        let str = linkHref;
        cost = Number(str.substring(str.indexOf("cost=")).replace('cost=', ''));
        return cost;
    }

    // Adding image to Doors.
    function addDoorImage(door, color, glass, doorInnerColor, doorOuterColor, e) {

        // For two doors
        if (e.target.href.indexOf('#doorInnerColor') != -1 || e.target.href.indexOf('#doorOuterColor') != -1) {
            $.get(github_url + 'two_door/' + door + '/' + doorOuterColor + doorInnerColor + '.jpeg')
                .done(function () {
                    console.log('Такая фотография есть');
                    doorImg.attr('src', github_url + 'two_door/' + String(door) + '/' + String(doorOuterColor) + String(doorInnerColor) + '.jpeg');
                }).fail(function () {
                throw new Error('Такой фотографии нет! :/');
            })
        }

        // For one door
        if (e.target.href.indexOf('#doorColor') != -1 || e.target.href.indexOf('#glass') != -1) {
            $.get(github_url + 'one_door/' + door + '/' + color + glass + '.jpeg')
                .done(function () {
                    doorImg.attr('src', github_url + 'one_door/' + String(door) + '/' + String(color) + String(glass) + '.jpeg');
                }).fail(function () {
                throw new Error('Такой фотографии нет! :/');
            })
        }
        console.log(door, color, glass, doorInnerColor, doorOuterColor, e)

    }

    // Get door selector
    function getDoorSelector(e) {

        // for two doors
        if (e.target.href.indexOf('#doorInnerColor') != -1) {
            doorImg = $('a').filter(function (i, d) {
                if (d.href.indexOf('#innerDoor=') != -1) {
                    return true;
                }
            }).find('img');
        }

        if (e.target.href.indexOf('#doorOuterColor') != -1) {
            doorImg = $('a').filter(function (i, d) {
                if (d.href.indexOf('#outerDoor=') != -1) {
                    return true;
                }
            }).find('img');
        }

        // for one door
        if (e.target.href.indexOf('#doorColor') != -1 || e.target.href.indexOf('#glass') != -1) {
            doorImg = $('a').filter(function (i, d) {
                if (d.href.indexOf('#door=') != -1) {
                    return true;
                }
            }).find('img')
        }
    }

    // Get door name 2u,2x e.t.c
    function getDoorName(e) {

        // for two doors
        if (e.target.href.indexOf('#doorInnerColor') != -1) {
            var result = $('a').filter(function (i, d) {
                if (d.href.indexOf('#innerDoor=') != -1) {
                    return true;
                }
            }).attr('href').replace('#innerDoor=', '');
        }
        if (e.target.href.indexOf('#doorOuterColor') != -1) {
            var result = $('a').filter(function (i, d) {
                if (d.href.indexOf('#outerDoor=') != -1) {
                    return true;
                }
            }).attr('href').replace('#outerDoor=', '');
        }

        // for one door
        if (e.target.href.indexOf('#doorColor') != -1 || e.target.href.indexOf('#glass') != -1) {
            var result = $('a').filter(function (i, d) {
                if (d.href.indexOf('#door=') != -1) {
                    return true;
                }
            }).attr('href').replace('#door=', '');
        }
        door = result;
        return result;
    }

    /**
     * Find price field
     * params (selectors href);
     * return jQuery object
     */
    function findPriceField(href_url) {
        return $('a').filter(function (i, d) {
            if (d.href.indexOf(href_url) != -1) {
                return true;
            }
        })
    }

    // Calculate price
    function calculatePrice(e) {
        if (!e) {
            $('a').filter(function (i, d) {
                if (d.href.indexOf('doorOuterColor=1') != -1) {
                    costOuter = findCost(d.href)
                }
                if (d.href.indexOf('doorInnerColor=1') != -1) {
                    costInner = findCost(d.href)
                }
            })
            $priceField.text(costInner + costOuter + ' руб.')
        }
        if (e) {
            $('a').filter(function (i, d) {
                if (e.target.href.indexOf('doorOuterColor=1') != -1) {
                    costOuter = findCost(e.target.href)
                }
                if (e.target.href.indexOf('doorInnerColor=1') != -1) {
                    costInner = findCost(e.target.href)
                }
            })
            $priceField.text(costInner + costOuter + ' руб.')
        }
    }

    // calculate by default (first elemments sum)
    calculatePrice()

    // Add styles.
    $('body').append('<style>.borderActive { border: 2px solid ' + borderColor + ' !important}</style>');
})

