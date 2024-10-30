<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Template for builder page
 *
 * @package     Bloks
 * @copyright   Copyright (c) 2017, Bloks
 * @license     https://opensource.org/licenses/gpl-license GNU Public License
 * @since       1.0
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php wp_title(); ?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class('bloks__builder'); ?>>
<?php while (have_posts()) : the_post();
    ?>

    <div id="bloks__app"></div>

    <script type="text/x-template" id="bloks__app-template">
        <div class="bloks">
            <div class="bloks__header">
                <a href="javascript:void(0);" class="bloks__canvas__button-toggle" @click="canvas = !canvas">
                    <span class="ibloks-plus"></span>
                    <?php _e('Add Bloks', BLOKS_TEXTDOMAIN)?>
                </a>
                <div class="bloks__page-tools" @click="canvas = false">
                    <div class="bloks__settings">
                        <div class="bloks__viewports">
                            <a href="javascript:void(0);" title="<?php _e('Desktop mode', BLOKS_TEXTDOMAIN)?>" v-bind:class="{ active: viewport === 'desktop' }" class="bloks__viewports-desktop" data-viewport="desktop">
                                <i class="ibloks-desktop"></i>
                            </a>
                            <a href="javascript:void(0);" title="<?php _e('Tablet mode', BLOKS_TEXTDOMAIN)?>" v-bind:class="{ active: viewport === 'tablet' }" class="bloks__viewports-tablet" data-viewport="tablet">
                                <i class="ibloks-tablet"></i>
                            </a>
                            <a href="javascript:void(0);" title="<?php _e('Mobile mode', BLOKS_TEXTDOMAIN)?>" v-bind:class="{ active: viewport === 'phone' }" class="bloks__viewports-phone" data-viewport="phone">
                                <i class="ibloks-mobile"></i>
                            </a>
                        </div>

                        <div class="bloks__page-title">
                            <input type="text" name="page-title" placeholder="<?php _e('Enter your Title', BLOKS_TEXTDOMAIN)?>" value="<?php the_title()?>" />
                        </div>
                        <a href="javascript:void(0)" title="<?php _e('Page Settings', BLOKS_TEXTDOMAIN)?>" class="pagesettings bloks-tooltip" v-bind:class="{ active: pageSettings }" @click="pageSettings = !pageSettings">
                            <i class="ibloks-setting"></i>
                        </a>
                        <a href="javascript:void(0)" title="<?php _e('Preset Template', BLOKS_TEXTDOMAIN)?>" class="pagepreset bloks-tooltip" v-bind:class="{ active: pagePreset }" @click="pagePreset = !pagePreset">
                            <i class="ibloks-setting"></i>
                        </a>
                    </div>

                    <div class="bloks__actions">
                        <div class="bloks__actions__dropdown">
                            <button type="button" class="bloks__actions__dropdown-btn-save" @click="save" :disabled="!canSave">
                                <?php _e('Save',BLOKS_TEXTDOMAIN) ?>
                            </button>
                            <button class="bloks__actions__dropdown-toggle" :disabled="!canSave" type="button"></button>
                            <ul class="bloks__actions__dropdown__menu">
                                <li><a href="javascript:void(0)" @click="preview" ><?php _e('Save and Preview', BLOKS_TEXTDOMAIN) ?></a></li>
                                <li><a href="javascript:void(0)" @click="publish" ><?php _e('Save and Publish',BLOKS_TEXTDOMAIN) ?></a></li>
                            </ul>
                        </div>
                        <a title="<?php _e('Back to Admin', BLOKS_TEXTDOMAIN)?>" class="bloks__actions-close bloks-tooltip" href="<?php echo get_edit_post_link()?>">
                            <i class="ibloks-cancel"></i>
                        </a>
                    </div>

                    <div class="bloks__messages" v-if="message != ''" transition="flash">{{{message}}}</div>
                </div>

            </div>
            <div class="bloks__canvas" v-bind:class="{ active: canvas }">
                <div class="bloks__canvas__nav">
                    <?php $templates = Bloks()->getBuilderFactory()->getComponent()->getTemplates();?>
                    <ul class="bloks__canvas__nav-type">
                        <?php foreach ($templates as $type => $value):?>
                            <li>
                                <a href="javascript:void(0)" v-bind:class="{ active: hover == '<?php echo $type?>' }" @click="hover = '<?php echo $type?>'"><?php _e($value['title'], BLOKS_TEXTDOMAIN)?></a>
                            </li>
                        <?php endforeach?>
                    </ul>
                    <div class="bloks__canvas__nav-templates">
                        <?php foreach ($templates as $type => $value):?>
                            <?php if(isset($value['templates'])&&count($value['templates'])):?>
                                <div class="bloks__canvas__nav-template" v-show="hover === '<?php echo $type?>'">
                                    <?php $number = 0?>
                                    <?php foreach ($value['templates'] as $name => $instance):?>
                                        <?php if($instance->isAcceptPostType(get_post_type())):?>
                                            <?php $number++;
                                            echo ($number == 1)? '<ul>':'';  ?>
                                            <li>
                                                <a @click="appendComponent" data-tpl="<?php echo $type . '-' . $name ?>-template" href="javascript:void(0)">
                                                    <div class="image"> <img src="<?php echo $instance->getScreenshot()?>" alt="<?php echo $instance->getName()?>" /></div>
                                                    <div class="bloks-name">
                                                        <span class="label"><?php echo $instance->getName()?></span>
                                                    </div>
                                                </a>
                                                <?php if(isset($instance->is_custom) && $instance->is_custom):?>
                                                    <span class="is_custom"><i><?php _e('Custom Block', BLOKS_TEXTDOMAIN)?></i></span>
                                                <?php endif; ?>
                                            </li>
                                            <?php if($number == 3){
                                                echo '</ul>';
                                                $number = 0; }
                                            ?>
                                        <?php endif?>
                                    <?php endforeach?>
                                    <?php echo (($number != 0)&&($number != 3))?'</ul>':'' ?>
                                </div>
                            <?php endif?>
                        <?php endforeach;?>
                    </div>
                </div>

            </div>
            <?php $src = strpos(get_the_permalink(), '?') === false ? get_the_permalink() . '?iframe' : get_the_permalink() . '&iframe';?>
            <iframe class="bloks__iframe" src="<?php echo $src?>"></iframe>

            <!-- page settings -->
            <div class="bloks__page-settings" v-show="pageSettings" transition="fade-down">
                <div class="bloks__page-settings-container">
                    <div class="bloks__page-settings-header">
                        <a href="javascript:void(0)" class="close" @click="pageSettings = !pageSettings"><span class="ibloks-cancel"></span></a>
                        <h4 class="bloks__page__settings-title"><?php _e('Page Settings', BLOKS_TEXTDOMAIN)?></h4>
                    </div>
                    <div class="bloks__page-settings-body">
                        <form id="bloks-meta-form">
                            <div class="form-group">
                                <label for="keywords"><?php _e('Permalink:', BLOKS_TEXTDOMAIN)?></label>
                                <div class="bloks-edit-permalink" v-bind:class="{ active: inEditSlug}">
                                    <div style="float: left;" class="sample-permalink">
                                        <a href="<?php echo get_site_url();?>?page_id=<?php echo get_the_ID();?>&preview=true" target="_blank"><?php echo get_site_url();?>/<span v-show="!inSlugInput" id="editable-post-name">{{slug}}/</span></a>
                                    </div>
                                    <div class="bloks-action-permalink">
                                        <input class="input-edit-permalink" v-show="inSlugInput" type="text" v-model="slug" v-on:keyup.enter="getSampleLink" />
                                        <span v-show="inEditSlug"></span>
                                        <span v-show="inSlugSuccess" class="ibloks-success"></span>
                                        <a class="save" v-show="inEditSlug" v-on:click="getSampleLink" href="javascript:void(0)"><?php _e(' Save', BLOKS_TEXTDOMAIN)?></a>
                                        <a class="edit-permalink" v-show="!inSlugInput" href="javascript:void(0);" v-on:click="showInputEdit"><?php _e('Edit', BLOKS_TEXTDOMAIN)?></a>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="keywords"><?php _e('Meta Keywords:', BLOKS_TEXTDOMAIN)?></label>
                                <input id="keywords" name="meta[_meta_keywords]" type="text" class="form-control" value="<?php echo get_post_meta(get_the_ID(), '_meta_keywords', true)?>" />
                            </div>
                            <div class="form-group">
                                <label for="description"><?php _e('Meta Description:', BLOKS_TEXTDOMAIN)?></label>
                                <textarea id="description" name="meta[_meta_description]" class="form-control"><?php echo get_post_meta(get_the_ID(), '_meta_description', true)?></textarea>
                            </div>
                            <div class="form-group">
                                <label for="custom_js"><?php _e('Custom JS:', BLOKS_TEXTDOMAIN)?></label>
                                <textarea id="custom_js" name="meta[_custom_js]" class="form-control"><?php echo get_post_meta(get_the_ID(), '_custom_js', true)?></textarea>
                            </div>
                            <div class="form-group">
                                <label for="custom_css"><?php _e('Custom CSS:', BLOKS_TEXTDOMAIN)?></label>
                                <textarea id="custom_css" name="meta[_custom_css]" class="form-control"><?php echo get_post_meta(get_the_ID(), '_custom_css', true)?></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="bloks__page-settings-footer">
                        <button type="button" class="bloks__button-save" @click="pageSettings = !pageSettings"><?php _e('Save', BLOKS_TEXTDOMAIN)?></button>
                    </div>
                </div>
            </div>
            <!-- page placeholder -->
            <div class="page-placeholder" id="bloks__canvas__page-placeholder" v-show="pagePlaceholder">
                <div class="bloks__page-placeholder">
                    <p class="building-landing">Start building your landing page now</p>
                    <a href="javascript:void(0);" class="bloks__canvas__button-toggle">
                        <i class="ibloks-plus"></i> Add Bloks
                    </a>
<!--                    <span>or</span><br>-->
<!--                    <p class="preset-template">Select your favorite landing page template</p>-->
                </div>
            </div>

            <!-- Page Preset-->
<!--            <div class="bloks__page-preset" v-show="pagePreset" transition="fade-down">-->
<!--                <div class="bloks__page-preset-container">-->
<!--                    <div class="bloks__page-preset-header">-->
<!--                        <a href="javascript:void(0)" class="close" @click="pagePreset = !pagePreset"><span class="ibloks-cancel"></span></a>-->
<!--                        <h4 class="bloks__page__preset-title">--><?php //_e('Page Preset', BLOKS_TEXTDOMAIN)?><!--</h4>-->
<!--                    </div>-->
<!--                    <div class="bloks__page-preset-body">-->
<!--                        --><?php //$presettemplates = Bloks()->getBuilderFactory()->getPreset()->getPresetTemplates();?>
<!--                        <div class="bloks__canvas__nav-templates container" id="bloks__canvas__nav-templates">-->
<!--                            --><?php //foreach ($presettemplates as $type => $value):?>
<!--                                --><?php //if(count($value)):?>
<!--                                    <div class="bloks__canvas__nav_preset-template">-->
<!--                                        <div class="container">-->
<!--                                        --><?php //$number = 0?>
<!--                                        <div class="row">-->
<!--                                        <ul>-->
<!--                                        --><?php //foreach ($value as $name => $instance):?>
<!--                                            --><?php //if($instance->isAcceptPostType(get_post_type())):?>
<!--                                                --><?php //$number++;
//                                                echo ($number == 1)? '<ul>':'';  ?>
<!--                                                <li>-->
<!--                                                    <a @click="importPreset" data-tpl="--><?php //echo 'preset-' . $name ?><!---template" href="javascript:void(0)">-->
<!--                                                        <div class="image"> <img src="--><?php //echo $instance->getScreenshot()?><!--" alt="--><?php //echo $instance->getName()?><!--" /></div>-->
<!--                                                        <div class="bloks-name">-->
<!--                                                            <span class="label">--><?php //echo $instance->getName()?><!--</span>-->
<!--                                                            --><?php //if(isset($instance->is_custom) && $instance->is_custom):?>
<!--                                                                <span class="is_custom">--><?php //_e('Custom Block', BLOKS_TEXTDOMAIN)?><!--</span>-->
<!--                                                            --><?php //endif; ?>
<!--                                                        </div>-->
<!--                                                    </a>-->
<!--                                                </li>-->
<!--                                                --><?php //if($number == 4){
//                                                    echo '</ul>';
//                                                    $number = 0; }
//                                                    ?>
<!--                                                --><?php //endif?>
<!--                                        --><?php //endforeach?>
<!--                                            --><?php //echo (($number != 0)&&($number != 3))?'</ul>':'' ?>
<!---->
<!--                                        </ul>-->
<!--                                        </div>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                --><?php //endif?>
<!--                            --><?php //endforeach;?>
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
            <div class="bloks__overlay" v-show="pageSettings || pagePreset"></div>
            <div class="bloks__overlay-iframe" v-show="canvas" @click="canvas = false"></div>
            <div class="bloks__builder-backdrop" v-show="loader"></div>
            <div class="bloks__builder-loader" v-show="loader">
                <div class="bloks__builder-progress">
                    <div class="bloks__builder__progress-indeterminate"></div>
                </div>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1202 1196" style="enable-background:new 0 0 1202 1196;" xml:space="preserve" width="200px" height="200px">
                    <g>
                        <g>
                            <rect class="bloks__builder__loader-block bloks__builder__loader-block-2" x="10.4" y="9.1" width="349.5" height="1039.8"/>
                            <rect class="bloks__builder__loader-block bloks__builder__loader-block-1" x="10.8" y="1074.1" width="1178.5" height="115.9"/>
                            <rect class="bloks__builder__loader-block bloks__builder__loader-block-3" x="388.6" y="9.1" width="802" height="435.7"/>
                            <rect class="bloks__builder__loader-block bloks__builder__loader-block-9" x="388.3" y="471.1" width="385.8" height="230.1"/>
                            <rect class="bloks__builder__loader-block bloks__builder__loader-block-4" x="803.3" y="471.1" width="385.8" height="230.1"/>
                            <rect class="bloks__builder__loader-block bloks__builder__loader-block-7" x="388.3" y="915.1" width="385.8" height="133.1"/>
                            <rect class="bloks__builder__loader-block bloks__builder__loader-block-6" x="803.5" y="915.1" width="385.8" height="133.1"/>
                            <rect class="bloks__builder__loader-block bloks__builder__loader-block-8" x="387.5" y="729.7" width="249.5" height="158.4"/>
                            <rect class="bloks__builder__loader-block bloks__builder__loader-block-10" x="665.1" y="729.7" width="249.5" height="158.4"/>
                            <rect class="bloks__builder__loader-block bloks__builder__loader-block-5" x="940" y="729.7" width="249.5" height="158.4"/>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
    </script>
<?php endwhile;?>
<?php wp_footer(); ?>
</body>
</html>
