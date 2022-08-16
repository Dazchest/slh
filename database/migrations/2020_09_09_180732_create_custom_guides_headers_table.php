<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomGuidesHeadersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('custom_guides_headers', function (Blueprint $table) {
            $table->id();
            $table->integer('users_id');
            $table->text('name');
            $table->integer('addy_id');
            $table->text('image');
            $table->text('wiki_link');
            $table->integer('shared');
            $table->text('type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('custom_guides_headers');
    }
}
