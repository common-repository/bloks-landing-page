<?php
// Exit if accessed directly.
if (! defined('ABSPATH') ) {
    exit;
}

/**
 * Class Bloks_Builder_Preset
 *
 * @package     Bloks
 * @subpackage  Builder
 * @copyright   Copyright (c) 2017, Bloks
 * @license     https://opensource.org/licenses/gpl-license GNU Public License
 * @since       1.0
 */
class Bloks_Builder_Preset
{
    /**
     * Method to get preset templates instance
     *
     * @return array
     */
    public function getPresetTemplates()
    {
        $templates = array();
        $dir = BLOKS_ROOT_PATH . DS . 'presets';
        if(is_dir(get_template_directory(). '/bloks/presets/')) {
            $files = $this->getTemplateFiles(
                get_template_directory(). '/bloks/presets/'
            );
            if(count($files)) {
                $dir = get_template_directory(). '/bloks/presets/';
            }
        }

        if(is_dir(get_stylesheet_directory() . '/bloks/presets/')) {
            $files = $this->getTemplateFiles(
                get_stylesheet_directory(). '/bloks/presets/'
            );
            if(count($files)) {
                $dir = get_template_directory(). '/bloks/presets/';
            }
        }

        $dir = apply_filters('bloks_builder_get_preset_folder', $dir);
        $files = $this->getTemplateFiles($dir);
        foreach ($files as $filename => $file) {
            $instance = new Bloks_Core_Block_Template_Processor($file);
            $templates['templates'][$filename] = $instance;
        }

        return $templates;
    }

    /**
     * Method to get the full path of all files
     * in the directoryand all subdirectories of a directory
     *
     * @param string $dir
     * @return array
     */
    public function getTemplateFiles($dir)
    {
        $result = array();
        $files = glob($dir . DS . '*.html');
        foreach ($files as $file) {
            $fileInfo = pathinfo($file);
            $result[$fileInfo['filename']] = $file;
        }
        return $result;
    }
}
