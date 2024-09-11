<template>
	<div class="course-detail-page">
		<div class="course-detail-banner">
			<div class="banner">
				<h1>软件设计师（软考中级），一站式通关课程</h1>
				<!-- 会员专享 -->
				<div class="vip-box">
					<img src="@/assets/images/logo.png" />
					<span>会员专享</span>
				</div>
				<p>新考纲通关备考系统指南，助你高效备考，倍速掌握知识要点，顺利通关</p>

				<div class="info-box">
					<div class="item-box">已完结</div>
					<span class="devide">|</span>
					<div class="item-box">
						难度：<span class="red js-difficult-word">中级</span>
					</div>
					<span class="devide">|</span>
					<div class="item-box">时长：共 <span class="red">28</span> 小时</div>
				</div>
			</div>
			<div class="btn-box">
				<Button label="Danger" severity="danger" rounded>开通会员</Button>
			</div>
		</div>

		<div class="course-content">
			<div class="right">
				<Card>
					<template #title> 课程目录 </template>
					<template #content>
						<ul>
              <li>
                <i class="pi pi-video"></i>
                <span>第一章：软件设计基础</span>
              </li>
              <li>
                <i class="pi pi-video"></i>
                <span>第二章：软件设计过程</span>
              </li>
              <li>
                <i class="pi pi-video"></i>
                <span>第三章：软件设计方法</span>
              </li>
              <li>
                <i class="pi pi-video"></i>
                <span>第四章：软件设计工具</span>
              </li>
						</ul>
					</template>
				</Card>

        <!-- 评论区 -->
        <Card class="comment-card">
          <template #title> 评论 </template>
          <template #content>
            <div class="comment-box">
              <div class="comment-item">
                <div class="avatar">
                  <img src="@/assets/images/profile-1.png" />
                </div>
                <div class="info">
                  <p class="name">李四</p>
                  <p class="comment">课程内容很丰富，讲解的很详细</p>
                </div>
              </div>
              <div class="comment-item">
                <div class="avatar">
                  <img src="@/assets/images/profile-2.png" />
                </div>
                <div class="info">
                  <p class="name">李四</p>
                  <p class="comment">课程内容很丰富，讲解的很详细</p>
                </div>
              </div>
            </div>
          </template>
        </Card>
			</div>

			<div class="left">
				<Card>
					<template #title> 课程介绍 </template>
					<template #content>
						<p>
							本课程是软件设计师（软考中级）考试的一站式通关课程，主要讲解软件设计师考试的知识点，包括软件设计基础、软件设计过程、软件设计方法、软件设计工具、软件设计实践等内容。
						</p>
					</template>
				</Card>

        <!-- 推荐课程 -->
        <Card>
          <template #title> 推荐课程 </template>
          <template #content>
            <div class="recommend-course">
              <div class="item">
                <img src="@/assets/images/course-1.jpg" />
                <div class="info">
                  <a href="#">Learn React With Mini Projects</a>
                  <p>Author : Reza Mehdikhanlou</p>
                  <p>Duration : +13h</p>
                  <p>Lifetime Support</p>
                </div>
              </div>
              <div class="item">
                <img src="@/assets/images/course-2.jpg" />
                <div class="info">
                  <a href="#">Complete Bootstrap Course</a>
                  <p>Author : Reza Mehdikhanlou</p>
                  <p>Duration : +13h</p>
                  <p>Lifetime Support</p>
                </div>
              </div>
              <div class="item">
                <img src="@/assets/images/course-3.jpg" />
                <div class="info">
                  <a href="#">Learn Angular Fundamentals</a>
                  <p>Author : Reza Mehdikhanlou</p>
                  <p>Duration : +13h</p>
                  <p>Lifetime Support</p>
                </div>
              </div>
            </div>
          </template>
        </Card>
			</div>
		</div>
	</div>
</template>

<script></script>

<style scoped></style>
