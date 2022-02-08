<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" doctype-system="about:legacy-compat" />
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<meta charset="utf-8" />
				<link rel="stylesheet" type="text/css" href="../shared/resume.css" />

			</head>
			<body>
				<div class="information-header">
					<h1 id="name">
						<xsl:value-of select="resume/header/name" />
					</h1>
					<h3>
						<xsl:value-of select="resume/header/contact/email/@title" />:
						<xsl:value-of select="resume/header/contact/email" />
					</h3>
					<h3>
						<xsl:value-of select="resume/header/contact/phone/@title" />:
						<xsl:value-of select="resume/header/contact/phone" />
					</h3>
					<h3>
						<xsl:value-of select="resume/header/contact/address/@title" />:
						<xsl:value-of select="resume/header/contact/address" />
					</h3>
				</div>
				<hr />
				<div class="education-background">
					<h1>
						<xsl:value-of select="resume/education/@title" />
					</h1>
					<h3>
						<xsl:value-of select="resume/education/institution" />
					</h3>

					<span>
						<xsl:value-of select="resume/education/level" />
						<xsl:value-of select="resume/education/field" />
					</span>
					<br />
					<span>
						Class of
						<xsl:value-of select="resume/education/graduation" />
					</span>

				</div>

				<hr />
				<div class="experience">
					<h2>
						<xsl:value-of select="resume/experience/@title" />
					</h2>
					<xsl:for-each select="resume/experience/item">
						<h3>
							<xsl:value-of select="./workplace" />
						</h3>
						<span>
							<xsl:value-of select="./period" />
						</span>
						<br />
						<ul>
							<xsl:for-each select="./tasklist/task">
								<li>
									<xsl:value-of select="." />
								</li>
							</xsl:for-each>

						</ul>

					</xsl:for-each>

				</div>

			</body>

		</html>
	</xsl:template>
</xsl:stylesheet>